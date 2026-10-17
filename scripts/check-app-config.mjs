// Uygulamaların app gate dosyalarını yayından önce denetler: public/<uygulama>/
// production.json ve staging.json (bakım modu, minimum sürüm). Biçim ve
// kurallar APP-CONFIG.md'de.
//
// Neden: uygulama okuyamadığı dosyada kapıyı açık bırakır (fail open). Bu,
// kimseyi kilitlemez ama bozuk bir dosya, yanlış yazılmış bir alan adı ya da
// "true" metni anahtarı sessizce kapatır: zorunlu güncelleme ya da bakım
// gerektiğinde çalışmaz. Bu betik o hataları yayından önce, Actions'ta durdurur.
//
// Çalıştır: node scripts/check-app-config.mjs  (GitHub Pages iş akışı build'den önce çalıştırır)
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'public';
const ENVIRONMENTS = ['production.json', 'staging.json'];
const PLATFORMS = ['ios', 'android'];

/** Uygulamanın okuduğu alanlar ve beklenen türleri (diary-app: src/data/remote/app-config.ts). */
const FIELDS = {
  minimumVersion: 'version',
  latestVersion: 'version',
  updateUrl: 'url',
  updateMessage: 'text',
  maintenance: 'boolean',
  maintenanceMessage: 'text',
  maintenanceUntil: 'instant',
};

const errors = [];
const summary = [];

const fail = (file, message) => errors.push(`${file}: ${message}`);
const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

/** Mağaza sürümü: üç sayı ("1.4.0"). Build numarası ya da ek ("1.4.0 (231)") değil. */
const VERSION = /^\d{1,9}\.\d{1,9}\.\d{1,9}$/;

function checkValue(file, where, key, value) {
  const kind = FIELDS[key];
  if (value === null) {
    if (kind === 'boolean') fail(file, `${where}.${key}: null olamaz, true ya da false yaz`);
    return;
  }
  switch (kind) {
    case 'version':
      if (typeof value !== 'string' || !VERSION.test(value)) {
        fail(file, `${where}.${key}: "1.4.0" gibi üç sayılı mağaza sürümü olmalı, gelen ${JSON.stringify(value)}`);
      }
      break;
    case 'boolean':
      // Uygulama yalnız gerçek true'da kapatır; "true" metni sessizce hiçbir şey yapmaz.
      if (typeof value !== 'boolean') fail(file, `${where}.${key}: tırnaksız true ya da false olmalı, gelen ${JSON.stringify(value)}`);
      break;
    case 'url':
      if (typeof value !== 'string' || !/^https:\/\/\S+$/.test(value)) fail(file, `${where}.${key}: https:// ile başlayan adres ya da null olmalı`);
      break;
    case 'text':
      if (typeof value !== 'string' || value.trim() === '') fail(file, `${where}.${key}: boş olmayan metin ya da null olmalı`);
      break;
    case 'instant':
      if (typeof value !== 'string' || Number.isNaN(Date.parse(value))) {
        fail(file, `${where}.${key}: "2026-10-20T18:00:00+03:00" gibi tarih-saat ya da null olmalı`);
      }
      break;
  }
}

function checkFields(file, where, block) {
  for (const [key, value] of Object.entries(block)) {
    if (!(key in FIELDS)) fail(file, `${where}.${key}: bilinmeyen alan (yazım hatası mı? alanlar: ${Object.keys(FIELDS).join(', ')})`);
    else checkValue(file, where, key, value);
  }
}

function compareVersions(a, b) {
  const left = a.split('.').map(Number);
  const right = b.split('.').map(Number);
  for (let i = 0; i < 3; i += 1) if (left[i] !== right[i]) return left[i] < right[i] ? -1 : 1;
  return 0;
}

/** Uygulamanın göreceği hâl: `default` (ya da düz nesne), üstüne platformun bloğu, alan alan. */
function effective(json, platform) {
  const base = isObject(json.default) ? json.default : Object.fromEntries(Object.entries(json).filter(([key]) => key in FIELDS));
  return { ...base, ...(isObject(json[platform]) ? json[platform] : {}) };
}

function checkFile(app, name) {
  const file = join(ROOT, app, name);
  let json;
  try {
    json = JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    fail(file, `JSON okunamadı (${error.message})`);
    return;
  }
  if (!isObject(json)) {
    fail(file, 'en dışta bir nesne olmalı');
    return;
  }

  for (const [key, value] of Object.entries(json)) {
    if (key === 'default' || PLATFORMS.includes(key)) {
      if (!isObject(value)) fail(file, `${key}: nesne olmalı`);
      else checkFields(file, key, value);
    } else if (key in FIELDS) {
      if (isObject(json.default)) fail(file, `${key}: "default" varken alanlar onun içine yazılır`);
      else checkValue(file, '(düz)', key, value);
    } else {
      fail(file, `${key}: bilinmeyen anahtar (en dışta default, ios, android ya da alanlar olur)`);
    }
  }

  for (const platform of PLATFORMS) {
    const config = effective(json, platform);
    const { minimumVersion: min, latestVersion: latest } = config;
    if (typeof min === 'string' && typeof latest === 'string' && VERSION.test(min) && VERSION.test(latest) && compareVersions(min, latest) > 0) {
      fail(file, `${platform}: minimumVersion (${min}) latestVersion'dan (${latest}) büyük`);
    }
    summary.push(
      `${app}/${name.replace('.json', '')} ${platform}: min ${min ?? '-'} · son ${latest ?? '-'} · bakım ${config.maintenance === true ? 'AÇIK' : 'kapalı'}`,
    );
  }
}

const apps = existsSync(ROOT)
  ? readdirSync(ROOT).filter((name) => statSync(join(ROOT, name)).isDirectory() && ENVIRONMENTS.some((file) => existsSync(join(ROOT, name, file))))
  : [];

for (const app of apps) {
  for (const name of ENVIRONMENTS) {
    if (existsSync(join(ROOT, app, name))) checkFile(app, name);
    else fail(join(ROOT, app), `${name} yok (her uygulamanın production.json ve staging.json'u olur)`);
  }
}

console.log(`app-config: ${apps.length} uygulama (${apps.join(', ') || 'yok'})`);
for (const line of summary) console.log(`  ${line}`);

if (errors.length > 0) {
  console.error(`\napp-config: ${errors.length} hata — yayın durduruldu:`);
  for (const line of errors) console.error(`  ${line}`);
  process.exit(1);
}
console.log('app-config: temiz.');
