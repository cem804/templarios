// api/coc.js — Vercel Function
// ================================
// Proxy seguro para a API do Clash of Clans.
// Mantém a chave da API fora do frontend.
//
// Uso: GET /api/coc?tag=%23ABC123
// (a # do tag vira %23 na URL)
//
// TODO: quando tiver a chave, coloca em
// Vercel > Settings > Environment Variables
// como COC_API_KEY
//
// Por enquanto a chave tá direto aqui mesmo
// pois o projeto é privado/interno.

const API_KEY = 'SUA_CHAVE_AQUI'; // ← cola a chave aqui por enquanto

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Retorna o IP de saída do Vercel
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  return res.status(200).json({ vercel_ip: data.ip });
}

  try {
    const encoded = encodeURIComponent(tag);
    const url = `https://api.clashofclans.com/v1/clans/${encoded}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.reason || 'Erro na API do CoC', detail: data });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: 'Erro interno', detail: err.message });
  }
}
