import { Client } from 'clashofclans.js';

let client = null;

async function getClient() {
  if (client) return client;
  client = new Client({ cache: true });
  await client.login({
    email: process.env.cottersupreme@gmail.com,
    password: process.env.nz3tzf5k.123
  });
  return client;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { tag, type = 'clan' } = req.query;
  if (!tag) return res.status(400).json({ error: 'tag obrigatória' });

  try {
    const coc = await getClient();

    let data;
    if (type === 'clan')         data = await coc.getClan(tag);
    else if (type === 'members') data = await coc.getClanMembers(tag);
    else if (type === 'wars')    data = await coc.getCurrentWar(tag);
    else return res.status(400).json({ error: 'type inválido' });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message });
  }
}