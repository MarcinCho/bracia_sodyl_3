// Worker źródłowy — kopiowany do dist/_worker.js przy każdym buildzie
// (patrz skrypt "build" w package.json).
//
// Zastępuje dawną Cloudflare Pages Function (functions/api/media/[[path]].js)
// odpowiednikiem w formacie Workers: /api/media/<klucz> czyta plik z prywatnego
// bindingu R2 "MEDIA", wszystko inne oddaje do ASSETS (statyczne pliki SPA,
// z fallbackiem do index.html skonfigurowanym w wrangler.jsonc jako
// "not_found_handling": "single-page-application").

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/media/')) {
      const key = url.pathname.slice('/api/media/'.length)
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

      const ifNoneMatch = request.headers.get('if-none-match')
      if (ifNoneMatch && ifNoneMatch === object.httpEtag) {
        return new Response(null, { status: 304, headers })
      }

      return new Response(object.body, { headers })
    }

    return env.ASSETS.fetch(request)
  }
}
