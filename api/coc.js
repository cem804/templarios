import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const tag = req.query.tag; // ex: %23ABC123

  const response = await fetch(
    `https://www.clashofstats.com/players/${tag}`
  );

  const html = await response.text();
  const $ = cheerio.load(html);

  const name = $("h1").first().text();

  res.json({
    name,
  });
}
