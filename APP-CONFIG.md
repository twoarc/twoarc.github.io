# My Diary — uzak yapılandırma (app gate)

`public/diary/` altındaki iki dosyayı My Diary uygulaması açılışta okur:
bakım modu ve minimum sürüm. Kod `diary-app` reposunda
`src/services/app-gate/`, belge `docs/integrations/app-gate.md`
(app-spec 9AA-9, 10-25).

| Dosya | Adres | Hangi build okur |
|---|---|---|
| `production.json` | https://twoarc.github.io/diary/production.json | mağaza sürümleri (EAS `production`) |
| `staging.json` | https://twoarc.github.io/diary/staging.json | development ve preview build'ler |

## Alanlar

- `minimumVersion` — bunun altındaki sürüm kapanır, "Yeni sürüm gerekiyor"
  ekranı ve mağaza düğmesi gelir. Mağaza sürümü (`1.2.0`), build numarası değil.
- `latestVersion` — mağazadaki en yeni sürüm; altındakilere kapanmayan bir
  "güncelleme var" bildirimi. Yalnız mağaza o sürümü onayladıktan sonra yükselt.
- `maintenance: true` — herkesi bakım ekranında tutar. Yalnız gerçek `true`
  kapatır; yazım hatası, metin ya da eksik alan uygulamayı kapatmaz.
- `ios` / `android` blokları `default`'u alan alan ezer: bir mağaza sürümü
  onaylayıp diğeri onaylamadığında iki ayrı `minimumVersion` yazılır.

## Zorunlu güncelleme

1. `production.json`'da `minimumVersion`'ı yükselt (önce `staging.json`'da dene).
2. Commit ve push: GitHub Pages yeniden yayınlar, CDN önbelleği yüzünden
   herkese ulaşması ~10 dakika sürer.
3. `minimumVersion`'ı hiçbir zaman mağazada henüz yayında olmayan bir sürüme
   çekme: kullanıcı güncelleyemeyeceği bir ekranda kalır.

Dosya herkese açık; içine mağaza incelemesinin okumasında sakınca olmayan
şeylerden başkası yazılmaz. Okunamayan dosya (404, bozuk JSON, ağ yok)
kimseyi kapatmaz.
