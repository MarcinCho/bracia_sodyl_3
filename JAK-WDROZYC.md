# Jak wdrożyć wersję v2 na Cloudflare (Workers)

Sprawdziłem Twoje konto Cloudflare przez połączony konektor (tylko odczyt) — masz tam już bucket R2 `s-brothers-media` i istniejący, żywy Worker `braciasordyl` (prawdopodobnie obecna produkcyjna strona). Nie mam narzędzia do zdalnego wdrożenia, więc przygotowałem projekt pod `wrangler deploy` — wykonujesz to Ty, lokalnie, w 5 krokach.

Projekt wdraża się jako **nowy, osobny Worker** (`braciasordyl-podglad-v2`), więc nic nie nadpisze obecnej produkcyjnej strony. Dopiero po akceptacji zmieniasz nazwę w `wrangler.jsonc` na docelową (albo podpinasz custom domain w dashboardzie).

## Wymagania

- Node.js 18+ (zalecane 20/22)
- Konto Cloudflare z dostępem do bucketu R2 `s-brothers-media` (to samo, którego już używasz)

## Kroki

1. **Wejdź do folderu projektu**
   ```bash
   cd vue-app
   npm install
   ```

2. **Zaloguj Wranglera do swojego konta Cloudflare** (otworzy się przeglądarka)
   ```bash
   npx wrangler login
   ```

3. **Zbuduj i wdróż**
   ```bash
   npm run deploy
   ```
   Ten skrypt: buduje aplikację (`vite build`), dokłada `_worker.js` do `dist/`, po czym uruchamia `wrangler deploy`.

4. **Sprawdź podgląd** pod adresem, który wypisze Wrangler po zakończeniu — coś w stylu:
   ```
   https://braciasordyl-podglad-v2.<twoja-subdomena>.workers.dev
   ```

5. **Gdy zaakceptujesz wersję** — zmień `"name"` w `wrangler.jsonc` na docelową nazwę (np. `braciasordyl`, jeśli chcesz podmienić produkcję) i uruchom `npm run deploy` ponownie. Domenę `braciasordyl.pl` podpinasz w dashboardzie Cloudflare (Workers & Pages → Twój Worker → Domains & Routes).

## Co się zmieniło technicznie względem wersji z 3 lipca

Poprzednia wersja (`audyt-i-podglad-strony-2026-07-03/vue-app`) była napisana pod Cloudflare **Pages** (`functions/api/media/[[path]].js`, `public/_redirects`). Twoje konto ma już aktywny Worker, więc tę wersję (v2) skonfigurowałem od razu pod Cloudflare **Workers + Assets** (obecny, zalecany przez Cloudflare sposób hostowania statycznych stron z logiką brzegową):

- `wrangler.jsonc` — konfiguracja Workera: `assets` (statyczne pliki `dist/`, z fallbackiem SPA), `r2_buckets` (binding `MEDIA` → `s-brothers-media`).
- `_worker.js` — odpowiednik dawnej Pages Function: obsługuje `/api/media/<klucz>` z R2, resztę oddaje do statycznych assetów.
- `package.json` → `npm run deploy` = build + `wrangler deploy`.

Stary folder `functions/` i `public/_redirects` zostały w projekcie (nieużywane w tej ścieżce wdrożenia) — nie przeszkadzają, można je zignorować.

## Bezpieczeństwo

Nie proszę Cię o wklejanie tokenów API w tym czacie — `wrangler login` używa standardowego logowania przez przeglądarkę, bez przekazywania żadnych sekretów do mnie.
