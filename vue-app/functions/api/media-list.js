// TYMCZASOWY endpoint diagnostyczny — listuje zawartość bucketu R2 (binding "media"),
// żeby poznać rzeczywiste nazwy/klucze plików bez dostępu do panelu Cloudflare.
// Zwraca tylko nazwy plików, rozmiary i daty — nie ujawnia danych wrażliwych,
// ale mimo to do usunięcia (lub zabezpieczenia) po zakończeniu porządkowania galerii.
//
// URL: /api/media-list

export async function onRequestGet({ env }) {
  try {
    if (!env.MEDIA) {
      return new Response(JSON.stringify({
        error: 'Binding "MEDIA" nie jest widoczny w tym środowisku (env.MEDIA == undefined).',
        dostepneBindingi: Object.keys(env)
      }, null, 2), { status: 500, headers: { 'content-type': 'application/json; charset=utf-8' } })
    }

    const result = await env.MEDIA.list({ limit: 1000 })
    const objects = result.objects.map(o => ({
      key: o.key,
      size: o.size,
      uploaded: o.uploaded
    }))

    return new Response(JSON.stringify({ count: objects.length, truncated: result.truncated, objects }, null, 2), {
      headers: { 'content-type': 'application/json; charset=utf-8' }
    })
  } catch (err) {
    return new Response(JSON.stringify({
      error: err.message,
      name: err.name,
      stack: err.stack
    }, null, 2), { status: 500, headers: { 'content-type': 'application/json; charset=utf-8' } })
  }
}
