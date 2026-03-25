import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const tag = req.query.tag; // %23ABC123

    const response = await fetch(
      `https://www.clashofstats.com/clans/${tag}`
    );

    const html = await response.text();
    const $ = cheerio.load(html);

    // 🏷️ Nome do clã
    const name = $("h1").first().text().trim();

    // 🛡️ Badge (logo)
    const badge = $("img").first().attr("src");

    // ⭐ Nível do clã
    const level = $("body")
      .text()
      .match(/Level\s*(\d+)/i)?.[1] || null;

    // 👥 Membros
    const members = $("body")
      .text()
      .match(/Members\s*(\d+)\/50/i)?.[1] || null;

    // 🏆 Troféus (opcional)
    const trophies = $("body")
      .text()
      .match(/Points\s*([\d,]+)/i)?.[1] || null;

    // 📋 Requisitos (às vezes aparece como trophies required)
    const requiredTrophies = $("body")
      .text()
      .match(/Required Trophies\s*([\d,]+)/i)?.[1] || null;

    res.json({
      name,
      badge,
      level,
      members,
      trophies,
      requiredTrophies,
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar clã" });
  }
}
