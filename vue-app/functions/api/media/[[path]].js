// Cloudflare Pages Function — serwuje pliki bezpośrednio z bucketu R2
// podpiętego pod projekt jako binding o nazwie "media".
// URL: /api/media/<klucz-obiektu-w-r2>  np. /api/media/schody/schody-krete-1.jpg
//
// Bucket zostaje prywatny — nic nie jest upubliczniane, pliki przechodzą
// przez tę funkcję (edge) tylko dla żądań trafiających w istniejące klucze.

export async function onRequestGet({ params, env, request }) {
  const key = Array.isArray(params.path) ? params.path.join('/') : params.path
  if (!key) {
    return new Response('Brak klucza pliku', { status: 400 })
  }

  const object = await env.MEDIA.get(key)
  if (!object) {
    return new Response('Nie znaleziono pliku: ' + key, { status: 404 })
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  headers.set('cache-control', 'public, max-age=31536000, immutable')

  // Obsługa warunkowego GET (If-None-Match) — oszczędza transfer przy odświeżeniach.
  const ifNoneMatch = request.headers.get('if-none-match')
  if (ifNoneMatch && ifNoneMatch === object.httpEtag) {
    return new Response(null, { status: 304, headers })
  }

  return new Response(object.body, { headers })
}
