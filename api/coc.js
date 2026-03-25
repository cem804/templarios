// api/coc.js — Vercel Function (CommonJS)
// ==========================================
// Proxy seguro para a API oficial do Clash of Clans.
// Roda no servidor Vercel (IP fixo: 98.93.122.26)
//
// Endpoints disponíveis:
//   GET /api/coc?type=clan&tag=%23ABC123   → dados do clã
//   GET /api/coc?type=members&tag=%23ABC123 → membros do clã
//
// A tag deve ter o # codificado como %23 na URL.
// Exemplo: clã #2PP → /api/coc?type=clan&tag=%232PP

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjYxZTAwYzliLTlhNzMtNDMwYS1iZjVhLTIwNGQwZGM3OTM3NyIsImlhdCI6MTc3NDQ2MTM2NSwic3ViIjoiZGV2ZWxvcGVyL2Y3NGUwOWIyLTI5NDYtOGQ4OS04YTFmLTJiNDBlYzY4YjI0MiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjAuMC4wLjAiLCI2NC4yOS4xNy42NyIsIjQ0LjIwMC4yNDUuNDUiLCI5OC45My4xMjIuMjYiXSwidHlwZSI6ImNsaWVudCJ9XX0.kaxBaNJvvb1lAk4-JkWTS0jJbRushQimn7NMZ_aEr-yvxN4B7y9I4xzL206wOTsQGL7SwQHK357uoWncOqJzcw';

const BASE_URL = 'https://api.clashofclans.com/v1';

const HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'Accept': 'application/json',
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { type, tag } = req.query;

  if (!tag) {
    return res.status(400).json({ error: 'Parâmetro tag obrigatório. Ex: ?type=clan&tag=%232PP' });
  }

  const encoded = encodeURIComponent(decodeURIComponent(tag)); // normaliza o tag

  try {
    let url;

    if (type === 'members') {
      url = `${BASE_URL}/clans/${encoded}/members`;
    } else {
      // default: dados do clã
      url = `${BASE_URL}/clans/${encoded}`;
    }

    const response = await fetch(url, { headers: HEADERS });
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.reason || 'Erro na API do CoC',
        message: data.message || '',
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: 'Erro interno', detail: err.message });
  }
}
