# Bracia Sordyl — wersja podglądowa (Vue 3 + Vite)

Redesign strony głównej + galeria realizacji, przepisane na komponenty Vue 3 (Composition API, `<script setup>`) z routingiem (vue-router) i zbudowane przez Vite. Wynik builda to czysty, statyczny `dist/` (SPA) — gotowy pod Cloudflare Pages.

## Struktura

```
vue-app/
├── index.html                  ← wejściowy HTML (meta tagi SEO, JSON-LD, punkt montowania #app)
├── vite.config.js               ← build.outDir = "dist", base = "/" (wymagane przez routing z podstronami)
├── package.json
├── public/
│   └── _redirects              ← fallback SPA dla Cloudflare Pages (/* -> /index.html 200),
│                                   inaczej bezpośrednie wejście na /realizacje/schody da 404
├── functions/
│   └── api/
│       ├── media/[[path]].js   ← proxy do plików z prywatnego bucketu R2 (binding "MEDIA")
│       └── media-list.js       ← TYMCZASOWY endpoint diagnostyczny — listuje zawartość bucketu
└── src/
    ├── main.js
    ├── router.js                 ← trasy: / , /realizacje , /realizacje/:kategoria
    ├── style.css                 ← wspólny arkusz stylów
    ├── App.vue                   ← layout: banner + header + <router-view> + stopka
    ├── data/
    │   └── realizacje.js         ← kategorie i projekty galerii + prawdziwe klucze zdjęć z R2
    ├── views/
    │   ├── HomeView.vue           ← strona główna (sekcje jak dotychczas)
    │   ├── RealizacjeOverview.vue ← /realizacje — kafelki kategorii
    │   └── RealizacjeCategoryView.vue ← /realizacje/:kategoria — siatka projektów danej kategorii
    └── components/
        ├── PreviewBanner.vue
        ├── SiteHeader.vue        ← sticky header + działające menu mobilne (toggle)
        ├── HeroSection.vue
        ├── OfertaSection.vue
        ├── DlaczegoMySection.vue
        ├── RealizacjeSection.vue ← teaser na stronie głównej, linkuje do /realizacje
        ├── HistoriaSection.vue
        ├── OpinieSection.vue
        ├── KontaktSection.vue    ← reaktywny formularz (v-model), demonstracyjny submit
        ├── SiteFooter.vue
        └── Lightbox.vue          ← modal galerii zdjęć projektu (strzałki, Esc, kliknięcie w tło)
```

## Galeria realizacji

- **Struktura:** `/realizacje` (przegląd 7 kategorii: Schody, Meble kuchenne, Wnętrza, Kampery i jachty, Łazienki, Sypialnie, Meble ogrodowe) → `/realizacje/:kategoria` (siatka projektów tej kategorii) → kliknięcie w projekt otwiera lightbox z mini-galerią zdjęć (strzałki ← →, Esc, klik w tło zamyka).
- **Dane:** kategorie i projekty są w `src/data/realizacje.js`. Każdy projekt ma `images: [{ key: 'images/...' }]` — klucze realnych plików w buckecie R2.

### Zdjęcia — źródło i podawanie

Zdjęcia to materiał archiwalny z poprzedniej wersji strony, przechowywany w buckecie R2 `s-brothers-media` (prywatny, niepubliczny). Projekt Cloudflare Pages ma podpięty binding R2 o nazwie **`MEDIA`**. Funkcja `functions/api/media/[[path]].js` czyta obiekt z bucketu po kluczu i zwraca go jako plik (`/api/media/<klucz>` → np. `/api/media/images/schody.webp`). Komponenty (`Lightbox.vue`, `RealizacjeCategoryView.vue`, `RealizacjeOverview.vue`, `RealizacjeSection.vue`, `OfertaSection.vue`, `HistoriaSection.vue`) budują URL przez `mediaUrl(key)` z `src/data/realizacje.js`.

**Uwaga jakość:** to miniatury ze starej strony (kilka–kilkadziesiąt KB, niska rozdzielczość) — [DO WERYFIKACJI: czy dostępne są oryginały w wyższej jakości do podmiany przed publikacją produkcyjną].

**Do zrobienia porządkowego:** `functions/api/media-list.js` to tymczasowy endpoint diagnostyczny (`/api/media-list`, listuje całą zawartość bucketu) — użyty do zmapowania zdjęć na kategorie. Warto go usunąć albo zabezpieczyć przed pójściem na produkcję, żeby nie zostawiać publicznie dostępnego listingu plików.

### Dodanie nowych zdjęć / zmiana przypisania

1. Wgraj plik do bucketu R2 `s-brothers-media` (dowolna ścieżka, np. `images/meble/nowe-zdjecie.webp`).
2. W `src/data/realizacje.js` dodaj `{ key: 'images/meble/nowe-zdjecie.webp' }` do tablicy `images` odpowiedniego projektu (albo dodaj nowy projekt / kategorię).
3. Build + deploy — Function odczyta plik automatycznie, nie trzeba nic więcej zmieniać.

## Uruchomienie lokalnie

```bash
npm install
npm run dev        # podgląd deweloperski
npm run build       # build produkcyjny do dist/
npm run preview     # podgląd zbudowanej wersji dist/
```

Build został zweryfikowany lokalnie: `npm run build` kończy się bez błędów, `dist/` zawiera `index.html`, plik CSS i plik JS (patrz plan wdrożenia).

## Cloudflare Pages — ustawienia builda

| Ustawienie | Wartość |
|---|---|
| Framework preset | Vite (lub "None" + ustawienia poniżej) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (jeśli repo zawiera tylko ten projekt) |
| Node version | 18+ (zalecane 20/22) |

Projekt nie ma żadnych zależności backendowych — to czysto statyczny build (SPA), więc nie wymaga Cloudflare Workers ani funkcji serwerowych na tym etapie. Plik `public/_redirects` jest kopiowany do `dist/` przy buildzie i zapewnia, że Cloudflare Pages serwuje `index.html` dla wszystkich ścieżek (np. bezpośrednie wejście na `/realizacje/schody` lub odświeżenie strony) — bez tego takie adresy zwrócą 404.

## Uwagi

- `<meta name="robots" content="noindex, nofollow">` — celowo, żeby wersja podglądowa nie była indeksowana.
- Zdjęcia w galerii realizacji, sekcji Oferta i sekcji Historia to prawdziwe fotografie archiwalne z R2 (patrz sekcja "Galeria realizacji" wyżej) — placeholdery zostały już zastąpione. Wyjątek: sekcja Opinie nadal ma treść-zastępczą (brak zebranych opinii klientów).
- Formularz kontaktowy jest demonstracyjny — pokazuje komunikat potwierdzenia po stronie klienta, ale nic nie wysyła. Podłączenie do realnej skrzynki/CRM wymaga osobnej integracji (np. Cloudflare Worker jako backend formularza).
- Projekt korzysta z Cloudflare Pages Functions (binding R2 `MEDIA`) — to już nie jest w 100% statyczny build, wymaga poprawnie skonfigurowanego bindingu w ustawieniach projektu Cloudflare Pages (Settings → Functions → R2 bucket bindings).
