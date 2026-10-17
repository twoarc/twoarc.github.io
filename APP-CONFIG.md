# Uygulamaların uzak yapılandırması (app gate)

Bütün uygulamalarımızın bakım modu ve minimum sürümü bu repodan yönetilir.
**Kural: her uygulamanın `public/` altında kendi klasörü, klasörde iki dosya.**
Uygulama yalnız kendi dosyasını okur; birinde yapılan hata diğerlerine dokunmaz.

| Uygulama | Klasör | production (mağaza sürümleri) | staging (development, preview) |
|---|---|---|---|
| My Diary | `public/diary/` | https://twoarc.github.io/diary/production.json | https://twoarc.github.io/diary/staging.json |

Okuyan kod uygulamanın kendi reposunda (`src/services/app-gate/`,
`src/data/remote/app-config.ts`); belge `docs/integrations/app-gate.md`.
My Diary'de kararlar app-spec 9AA-9 ve 10-25.

## Yeni uygulama eklemek

1. `public/<uygulama>/production.json` ve `staging.json` (ikisi birden; biri
   eksikse yayın durur). Klasör adı kısa ve küçük harf: `goalx`, `rankingfilter`.
   İçerik aşağıdaki biçimde; ilk değerler yayındaki sürüm ve `maintenance: false`.
2. Yukarıdaki tabloya satır ekle.
3. Uygulamada: `src/config/app-gate.ts` → `enabled: true` ve iki mağaza linki;
   EAS'te `EXPO_PUBLIC_APP_CONFIG_URL` production için `…/production.json`,
   development ve preview için `…/staging.json`. Adres derlemeye gömülür:
   build değişken yazıldıktan sonra alınır.

## Biçim

```json
{
  "default": {
    "minimumVersion": "1.0.0",
    "latestVersion": "1.0.0",
    "updateUrl": null,
    "updateMessage": null,
    "maintenance": false,
    "maintenanceMessage": null,
    "maintenanceUntil": null
  },
  "ios": {},
  "android": {}
}
```

- `minimumVersion` — bunun altındaki sürüm kapanır, "Yeni sürüm gerekiyor"
  ekranı ve mağaza düğmesi gelir. Mağaza sürümü (`1.2.0`), build numarası değil.
- `latestVersion` — mağazadaki en yeni sürüm; altındakilere kapanmayan bir
  "güncelleme var" bildirimi. Yalnız mağaza o sürümü onayladıktan sonra yükselt.
- `maintenance: true` — herkesi bakım ekranında tutar. Yalnız gerçek `true`
  kapatır. `maintenanceUntil` ekranda "tahmini dönüş" olarak görünür, kendiliğinden açmaz.
- `ios` / `android` blokları `default`'u alan alan ezer: bir mağaza sürümü
  onaylayıp diğeri onaylamadığında iki ayrı `minimumVersion` yazılır.

## Zorunlu güncelleme

1. `production.json`'da `minimumVersion`'ı yükselt (önce `staging.json`'da dene).
2. Commit ve push: GitHub Pages yeniden yayınlar, CDN önbelleği yüzünden
   herkese ulaşması ~10 dakika sürer.
3. `minimumVersion`'ı hiçbir zaman mağazada henüz yayında olmayan bir sürüme
   çekme: kullanıcı güncelleyemeyeceği bir ekranda kalır.

## Yayından önce denetim

Uygulama okuyamadığı dosyada kapıyı açık bırakır: kimse kilitlenmez, ama
anahtar da sessizce çalışmaz. Bu yüzden GitHub Pages iş akışı build'den önce
`npm run check:app-config`'i (`scripts/check-app-config.mjs`) çalıştırır;
hata varsa yayın durur, eski dosyalar yayında kalır. Yakaladıkları:

- okunamayan JSON (sondaki virgül, eksik tırnak);
- bilinmeyen alan (`minimumVerison` gibi yazım hataları);
- tırnaklı `"true"`, üç sayı olmayan sürüm (`1.4.0 (231)`), `http://` adres;
- bir platformda `minimumVersion`'ın `latestVersion`'dan büyük olması;
- klasörde `production.json` ya da `staging.json`'dan birinin eksik olması.

Push etmeden önce yerelde: `npm run check:app-config` (her uygulamanın
platform başına etkin değerlerini de listeler).

Dosyalar herkese açık; içine mağaza incelemesinin okumasında sakınca olmayan
şeylerden başkası yazılmaz.
