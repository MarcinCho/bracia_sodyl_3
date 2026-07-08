# Wersja podglądowa v2 — co się zmieniło względem `audyt-i-podglad-strony-2026-07-03`

Folder: `redesign-2026-07-08/vue-app` (ten sam stos: Vue 3 + Vite + Cloudflare Pages Functions, R2 na zdjęcia).

## 1. Portfolio spłaszczone do 4 głównych obszarów

Wcześniej: 7 kategorii, a „Wnętrza" dodatkowo dzieliły się na 3 pod-projekty (sakralne / hotele i kawiarnie / biblioteki), co wymagało dodatkowego kliknięcia zanim dało się zobaczyć zdjęcia.

Teraz — jeden poziom, każdy obszar to bezpośrednio galeria zdjęć:

- Schody
- Kuchnie
- Wnętrza (sakralne, hotele/kawiarnie i biblioteki połączone w jedną galerię)
- Meble na wymiar (dawne Łazienki / Sypialnie / Ogrody połączone w jeden obszar)

Poza łączeniem kategorii, „Kampery i jachty" zostały usunięte z portfolio na życzenie klienta (v2.1) — razem ze zdjęciami z `images/meble/kampery*`. Poza tym żadne zdjęcie nie zostało usunięte — zmieniło się wyłącznie grupowanie w nawigacji i dane w `src/data/realizacje.js`.

## 2. Nowy kierunek wizualny

Poprzednia wersja podglądowa używała ciemnego antracytu ze złotym akcentem — rozpoznawalnego, ale bliskiego typowej stylistyce "premium dark theme". Wersja v2 opiera się o świat samej pracowni: rysunek warsztatowy / kartę rysunku technicznego, jakiej używa się przy projektowaniu schodów czy zabudów.

- Paleta: głęboki atramentowy błękit-slate (`--ink`), papier w tonie drewna (`--paper`), ciepły dąb jako akcent (`--oak`), mosiądz do detali (`--brass`).
- Typografia: Fraunces (nagłówki, krój z charakterem), Archivo (tekst), IBM Plex Mono (etykiety, dane liczbowe — jak opisy na rysunku technicznym).
- Element sygnaturowy: odręczny rysunek elewacji schodów skrzynkowych w hero, z liniami wymiarowymi i "kartą rysunku" (narożne znaczniki rejestracyjne) — motyw powtarza się w całej witrynie zamiast ozdobników.
- Sekcja „Dlaczego Bracia Sordyl" — usunięto numerację 01/02/03/04 (to nie jest sekwencja, tylko niezależne cechy) na rzecz krótkich etykiet.

## 3. Drobne porządki

- `OfertaSection` i `RealizacjeSection` korzystają teraz z jednego źródła danych (`src/data/realizacje.js`) zamiast osobnych, rozjeżdżających się list kategorii.
- Stopka: linki „Oferta” prowadzą teraz do rzeczywistych podstron `/realizacje/:kategoria` (wcześniej wszystkie po prostu odsyłały do `#oferta`).
- Formularz kontaktowy: lista „Rodzaj projektu” zaktualizowana do tych samych 4 obszarów.

## 4. Nowa sekcja „Pracownia w akcji" (v2.2)

Dodano sekcję z filmem pokazującym pracę stolarni (embed YouTube, domena `youtube-nocookie.com` — bez cookies śledzących do czasu odtworzenia), umieszczoną na stronie głównej między „Historią" a „Opiniami". Link „Warsztat" dodany w menu górnym i w stopce.

## 5. Przygotowanie pod wdrożenie na Cloudflare Workers (v2.3)

Konto Cloudflare (sprawdzone przez połączony konektor, tylko odczyt) ma już bucket R2 `s-brothers-media` i żywy Worker `braciasordyl`. Projekt przepisany z Cloudflare Pages na Workers + Assets: `wrangler.jsonc`, `_worker.js` (odpowiednik dawnej Pages Function `/api/media/...`), `npm run deploy`. Wdraża się jako nowy, osobny Worker (`braciasordyl-podglad-v2`), nie nadpisuje produkcji. Instrukcje krok po kroku: `JAK-WDROZYC.md`.

## Zweryfikowane

`npm install && npm run build` przechodzi bez błędów (`dist/` gotowy pod Cloudflare Pages, ustawienia builda takie same jak w README poprzedniej wersji).

## Uwaga

Zdjęcia serwowane są przez Cloudflare Pages Function + prywatny bucket R2 — w tym środowisku podglądowym (poza Cloudflare) miniatury się nie wczytają lokalnie; layout i typografię najlepiej ocenić po wdrożeniu na Pages albo przez `npm run dev` w środowisku z dostępem do bindingu R2.
