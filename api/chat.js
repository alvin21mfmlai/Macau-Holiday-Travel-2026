// Trip assistant for the Macau family trip page.
// Runs on Vercel as a serverless function. Your OpenAI API key stays here on the server.
// Environment variables (Vercel > Project > Settings > Environment Variables):
//   OPENAI_API_KEY  required
//   FAMILY_CODE     recommended: a short code family members type once
//   OPENAI_MODEL    optional: defaults to gpt-5-mini

const ITINERARY = "Family trip to Macau, Tuesday 22 to Saturday 26 December 2026.\nTravellers (7): Theresa, Bin Hao, Alvin, Gwen, Alisa, Mum and Dad. Hotel: Studio City, Cotai, Macau.\nTimes starting with ~ are estimates; other times come from the plan. FREE TIME means no group plan: rest, shop or do your own thing.\n\nDAY 1: Tuesday 22 December 2026. Arrival day. A long day of travel, so nobody heads out after dinner. Rest early.\n- 7:30–11:20am BOOKED: Fly Singapore → Hong Kong (SQ874, lands 11:20am)\n- ~11:30am–12:50pm PLANNED: Lunch at Hong Kong airport (After clearing immigration)\n- 1–~2:15pm TRAVEL: Transfer to Macau (Leave the airport at 1pm)\n- ~2:15–2:45pm TRAVEL: Check in at Studio City\n- ~2:45–5:10pm FREE TIME: Walk around the hotel mall (Rest, unpack or browse the shops at your own pace)\n- ~5:10–5:30pm TRAVEL: Head to The Londoner for dinner\n- 5:30–~7pm BOOKED: Dinner at North Palace (The Londoner Macao, table for 7) Restaurant page: https://hk.londonermacao.com/macau-restaurants/north-palace.html\n- ~7:15–8pm PLANNED: Golden Reel Ferris Wheel (At Studio City. It closes at 8pm, so go straight after dinner.) Golden Reel on Klook: https://www.klook.com/en-SG/activity/750-golden-reel-ferris-wheel-macau/\n- from 8pm FREE TIME: Rest early (Long day, so no going out tonight)\n\nDAY 2: Wednesday 23 December 2026. Senado Square and City of Dreams. Old Macau in the morning, then over to City of Dreams for the afternoon and dinner.\n- ~8:30–8:45am TRAVEL: Leave the hotel for Senado Square (13 min)\n- ~8:45–9:30am PLANNED: Breakfast at Cafe Kam Ma Lon (Opens 7am, 3 min walk from Senado Square)\n- ~9:30am–12:30pm PLANNED: Senado Square (Sightseeing and a walk around)\n- ~12:30–1:30pm PLANNED: Lunch near Senado (Chinese or Portuguese, to decide on the day)\n- ~1:30–3pm FREE TIME: Free time around Senado (Explore or shop at your own pace. Regroup to leave at 3pm.)\n- 3–~3:20pm TRAVEL: Leave Senado for City of Dreams (17 min)\n- ~3:20–6:30pm FREE TIME: Super Fun Zone for chuchu (Play by ear. Free time for anyone not watching the show.)\n- 4:30pm OPTIONAL: House of Dancing Water (4:30pm show at City of Dreams. Check who is keen so tickets can be bought.) Tickets on Klook: https://www.klook.com/en-SG/activity/90-the-house-of-dancing-water-macau/\n- 6:30–~8pm BOOKED: Dinner at Beijing Kitchen (City of Dreams, table for 7. Mum brings Alisa straight to the restaurant and orders food first.) Menu (PDF): https://www.cityofdreamsmacau.com/assets/public/2026-09/BJKMenu_renew_SEP_compressed.pdf\n- from ~8pm FREE TIME: Evening free (Back to the hotel)\n\nDAY 3: Thursday 24 December 2026 (Christmas Eve). Taipa Village and the Venetian. Congee and Taipa Village in the morning, Venetian shopping in the afternoon, cable car after dinner.\n- ~8:30–9:30am PLANNED: Breakfast at Seng Kei Congee (Taipa Mei Keng branch, 6 min from the hotel) Address: 氹仔布拉干薩街47號D 美景花園地下AZ舖\n- ~9:30am–12:30pm PLANNED: Walk around Taipa Village (9 min walk or 5 min drive from breakfast) Getting there: https://www.taipavillagemacau.com/getting-here/\n- ~12:30–1:30pm PLANNED: Lunch in Taipa (Sei Kee Cafe or Taipa Food Street) Sei Kee Cafe: https://www.taipavillagemacau.com/directory/sei-kee-cafe/\n- ~1:30–2:30pm FREE TIME: Free time in Taipa Village (Own pace. Regroup to leave at 2:30pm.)\n- 2:30–~2:45pm TRAVEL: Leave for the Venetian (11 min walk or 5 min drive)\n- ~2:45–5:45pm FREE TIME: Shopping at the Venetian (part 1) (Or book a massage at V Spa) V Spa on Klook: https://www.klook.com/en-SG/activity/123340-venetian-macao-v-spa/\n- 5:45–~6pm TRAVEL: Leave for Lisboa Bistrô (6 min drive)\n- 6–~7:45pm BOOKED: Dinner at Lisboa Bistrô (Grand Lisboa Palace, table for 7) Menu (PDF): https://assets.sjmresorts.com/2026-07/glp-lisboa-bistro-a-la-carte-menu-260710-160863e9.pdf\n- 8–~8:45pm PLANNED: Cable car at Wynn Palace (2 min drive from dinner. Runs 4pm to midnight.)\n- from ~8:45pm FREE TIME: Christmas Eve evening free\n\nDAY 4: Friday 25 December 2026 (Christmas Day). A-Ma Temple, Tap Seac market and hotpot. Temple in the morning, the Christmas market at Tap Seac, Venetian shopping, then the hotpot booking.\nHeads-up: Tap Seac's Christmas market only opens at 2pm. With the current order there is an open gap from about 11:30am, and lunch at the Venetian lands around 3:15pm.\n- ~8–9:15am PLANNED: Breakfast at Studio City\n- ~9:15–9:30am TRAVEL: Drive to A-Ma Temple (16 min)\n- ~9:30–11:30am PLANNED: A-Ma Cultural Village and Temple Macao Tourism guide: https://www.macaotourism.gov.mo/en/sightseeing/temples/a-ma-temple\n- ~11:30am–2pm FREE TIME: Free time (Open gap before the Tap Seac market opens. A good window for an earlier lunch.)\n- 2–~3pm PLANNED: Christmas market at Tap Seac Square (11 min drive from the temple. Open 2pm to midnight.)\n- ~3–3:20pm TRAVEL: Drive to the Venetian (17 min)\n- ~3:20–4:15pm PLANNED: Lunch at the Venetian (A late lunch if the order stays as planned)\n- ~4:15–5:45pm FREE TIME: Shopping at the Venetian (part 2)\n- ~5:45–6pm TRAVEL: Head to Hao Guo at MGM Cotai (6 min drive)\n- 6–~7:30pm BOOKED: Hotpot dinner at Hao Guo 好鍋 (MGM Cotai. Reserved with a credit card, so please do not cancel.) Restaurant page: https://www.mgm.mo/en/dining/mgm-cotai/hao-guo\n- from ~7:30pm FREE TIME: Christmas evening free\n- ~7:45–8:30pm OPTIONAL: Kun Iam Ecumenical Centre (Night view of the bronze Goddess of Mercy. 14 min from Hao Guo, then 11 min back to the hotel.)\n\nDAY 5: Saturday 26 December 2026. Flying home. Two groups on two different flights.\n[Theresa & Bin Hao]\n- 5:45–7am TRAVEL: Transfer to Hong Kong airport (Early start)\n- 9:05am–1:05pm BOOKED: Fly Hong Kong → Singapore (SQ899, lands 1:05pm)\n[Alvin, Gwen, Alisa, Mum & Dad]\n- ~7:30–10am FREE TIME: Breakfast, pack and check out (Morning at your own pace)\n- 10–11:30am TRAVEL: Transfer to Hong Kong airport\n- 11:30am–12:30pm TRAVEL: Check in at the airport\n- 12:30–3pm FREE TIME: Shop and eat at HK airport\n- ~3–3:45pm TRAVEL: Go to the gate and board\n- 3:45–7:50pm BOOKED: Fly Hong Kong → Singapore (SQ893, lands 7:50pm)\n\nDINNER BOOKINGS (all for 7 people)\n- Tue 22 Dec 5:30pm: North Palace, The Londoner Macao\n- Wed 23 Dec 6:30pm: Beijing Kitchen, City of Dreams. Mum and Alisa go ahead and order first.\n- Thu 24 Dec 6:00pm: Lisboa Bistrô, Grand Lisboa Palace\n- Fri 25 Dec 6:00pm: Hao Guo 好鍋, MGM Cotai. Credit-card reservation, do not cancel. Tel +853 8806 2368\n\nFLIGHTS\n- Tue 22 Dec SQ874: Singapore 7:30am to Hong Kong 11:20am (everyone)\n- Sat 26 Dec SQ899: Hong Kong 9:05am to Singapore 1:05pm (Theresa and Bin Hao; transfer from Macau at 5:45am)\n- Sat 26 Dec SQ893: Hong Kong 3:45pm to Singapore 7:50pm (Alvin, Gwen, Alisa, Mum and Dad; transfer from Macau at 10am)\n\nSTILL TO DECIDE\n- Who wants to watch House of Dancing Water (Wed 23 Dec, 4:30pm, City of Dreams); tickets not bought yet.\n- Lunch on 23 Dec near Senado Square: Chinese or Portuguese.\n- Christmas Day lunch timing: Tap Seac market opens at 2pm, so lunch at the Venetian would be around 3:15pm; could eat earlier after A-Ma Temple.\n- Mum's earlier draft has a hotel move from Studio City to the W Hotel on the morning of 24 Dec; not confirmed.\n\nIDEAS FOR FREE TIME\n- Coloane Village: about 4 min drive from the hotel; quiet old fishing village, pastel Portuguese buildings, waterfront promenade.\n- Gondola ride at the Venetian (indoor canals).\n- V Spa massage at the Venetian.\n- Eiffel Tower observation deck at The Parisian Macao, next to the Venetian.\n- Chan Kee Roasted Goose at Studio City (can eat anytime).\n- Amália Portuguese Restaurant: R/C, Edf. Chun Veng Kock, 300 Rua Direita Carlos Eugénio. Tel +853 2826 2628.";

function systemPrompt() {
  const now = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Macau", weekday: "long", day: "numeric", month: "long",
    year: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
  });
  return [
    "You are the trip assistant on our family's Macau trip page. Family members ask you about the plan.",
    "Rules:",
    "- Answer from the itinerary below. Never invent bookings, times, prices or phone numbers.",
    "- If the itinerary does not cover something, say so in one line, then give general Macau knowledge and suggest checking it (for example opening hours on the day).",
    "- Keep answers short: a few sentences or a short list. Plain text only, no markdown symbols such as ** or #. Use \"- \" for list items.",
    "- Use 12-hour times as written in the itinerary (for example 5:30pm). Say \"around\" for times marked with ~.",
    "- Reply in the same language as the question (English or Chinese).",
    "- \"Today\", \"tomorrow\" and \"tonight\" mean relative to the current date in Macau below. Before or after the trip dates, say how far away the trip is or that it has ended.",
    "",
    "Current date and time in Macau: " + now + ".",
    "",
    "ITINERARY",
    ITINERARY,
  ].join("\n");
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  return {};
}

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, needsCode: Boolean(process.env.FAMILY_CODE) });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "The assistant isn't set up yet. Add OPENAI_API_KEY in Vercel and redeploy." });

  const body = readBody(req);
  const familyCode = process.env.FAMILY_CODE;
  if (familyCode && String(body.code || "").trim() !== familyCode) {
    return res.status(401).json({ error: "wrong_code" });
  }

  const input = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  if (!input.length || input[input.length - 1].role !== "user") {
    return res.status(400).json({ error: "Please type a question." });
  }

  const model = process.env.OPENAI_MODEL || "gpt-5-mini";
  const payload = { model, instructions: systemPrompt(), input, max_output_tokens: 1500, store: false };
  if (/^(gpt-5|o\d)/.test(model)) payload.reasoning = { effort: "low" };

  try {
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25000),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error("OpenAI error", r.status, data && data.error && data.error.message);
      const msg = r.status === 429
        ? "The assistant is busy or out of API credit. Please try again later."
        : "The assistant couldn't answer right now. Please try again.";
      return res.status(502).json({ error: msg });
    }
    const text = (data.output || [])
      .filter((o) => o.type === "message")
      .flatMap((o) => o.content || [])
      .filter((c) => c.type === "output_text")
      .map((c) => c.text)
      .join("")
      .trim();
    if (!text) return res.status(502).json({ error: "No answer came back. Please ask again." });
    return res.status(200).json({ reply: text });
  } catch (e) {
    console.error("Assistant request failed", e);
    return res.status(502).json({ error: "Couldn't reach the assistant. Please try again." });
  }
};
