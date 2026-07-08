// Dane portfolio (v2 — spłaszczone do głównych obszarów pracy).
//
// Zdjęcia pochodzą z archiwalnych materiałów poprzedniej wersji strony
// (bucket R2 "s-brothers-media", katalog images/meble i images/meble1).
// Są serwowane przez Cloudflare Pages Function /api/media/<klucz>
// (functions/api/media/[[path]].js) na podstawie prywatnego bindingu R2 "MEDIA" —
// bucket nie jest publiczny, pliki przechodzą przez funkcję na edge.
//
// Uwaga: to zdjęcia w niskiej rozdzielczości (miniatury ze starej strony,
// kilka–kilkadziesiąt KB) — [DO WERYFIKACJI: czy firma dysponuje oryginałami
// w wyższej jakości do podmiany przed publikacją produkcyjną].
//
// Podpisy poszczególnych zdjęć (alt) są generyczne — brak w źródle metadanych
// typu lokalizacja/data/klient, więc nie zostały zmyślone.
//
// v2 — zmiana względem poprzedniej wersji podglądowej:
// Portfolio miało dwa poziomy (kategoria → pod-projekt → galeria), co dla
// większości kategorii było zbędnym dodatkowym kliknięciem (jeden pod-projekt
// na kategorię). Zebrano to do głównych obszarów pracowni — każdy to
// teraz bezpośrednio jedna galeria zdjęć. Wnętrza (sakralne / hotele i
// kawiarnie / biblioteki) oraz Łazienki / Sypialnie / Ogrody zostały połączone
// w dwa zbiorcze obszary — żadne zdjęcie nie zostało usunięte, zmieniło się
// tylko grupowanie w nawigacji.
//
// v2.1 — na życzenie klienta obszar "Kampery i jachty" został usunięty
// z portfolio (wraz ze zdjęciami z images/meble/kampery*).

function imgs(folder, prefix, nums) {
  return nums.map(n => ({ key: `${folder}${prefix}${n}m.webp` }))
}

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i)

export const categories = [
  {
    slug: 'schody',
    title: 'Schody',
    label: 'Konstrukcje nośne',
    shortDesc: 'Klasyczne, skrzynkowe, wiszące i kręte — stabilna konstrukcja i efektowny wygląd na lata.',
    cover: 'images/schody.webp',
    images: [
      ...imgs('images/meble1/', 'schodyk', range(1, 18)),
      ...imgs('images/meble1/', 'schodyn', range(1, 18)),
      ...imgs('images/meble1/', 'schodys', range(1, 18))
    ]
  },
  {
    slug: 'meble-kuchenne',
    title: 'Kuchnie',
    label: 'Meble użytkowe',
    shortDesc: 'Kuchnie projektowane pod codzienne życie rodziny — ergonomiczne, trwałe, na indywidualne zamówienie.',
    cover: 'images/kuchnie.webp',
    images: [
      ...imgs('images/meble1/', 'kuchnien', range(1, 17)),
      ...imgs('images/meble1/', 'kuchnies', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 22])
    ]
  },
  {
    slug: 'wnetrza',
    title: 'Wnętrza',
    label: 'Obiekty i wystrój',
    shortDesc: 'Nietypowe wykończenia wnętrz z drewna: obiekty sakralne, hotele i kawiarnie, biblioteki i zabudowy.',
    cover: 'images/wnetrza_st.webp',
    images: [
      ...imgs('images/meble/', 'sakralne', range(1, 18)),
      ...imgs('images/meble/', 'hotele-kawiarnie', [1]),
      ...imgs('images/meble1/', 'biblioteki', range(1, 18))
    ]
  },
  {
    slug: 'meble-na-wymiar',
    title: 'Meble na wymiar',
    label: 'Łazienki / sypialnie / ogród',
    shortDesc: 'Zabudowy łazienkowe, meble sypialniane i elementy ogrodowe wykonane na indywidualny wymiar.',
    cover: 'images/lazienki.webp',
    images: [
      ...imgs('images/meble/', 'lazienki', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 17, 18, 19, 20]),
      ...imgs('images/meble/', 'sypialnie', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20]),
      ...imgs('images/meble/', 'ogrody', range(1, 18))
    ]
  }
]

export function getCategory(slug) {
  return categories.find(c => c.slug === slug)
}

// Buduje URL do zdjęcia serwowanego przez Pages Function /api/media/<klucz>
// (functions/api/media/[[path]].js), która czyta plik z prywatnego bindingu R2 "MEDIA".
export function mediaUrl(key) {
  return `/api/media/${key}`
}
