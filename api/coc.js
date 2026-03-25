// api/coc.js — Vercel Function (CommonJS)
// Versão temporária só pra pegar o IP do Vercel
 
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
 
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  return res.status(200).json({ vercel_ip: data.ip });
}
 