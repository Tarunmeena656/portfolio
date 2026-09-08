// Vercel serverless function: reads a Medium author's public RSS feed server-side (Medium sends no
// CORS headers, so the browser cannot fetch it directly) and returns the posts as JSON.
// GET /api/medium?user=<handle>  ->  { user, posts: [{ title, link, pubDate, categories, excerpt, thumbnail, readMinutes }] }

const HANDLE = /^[A-Za-z0-9_.-]{1,64}$/;
const DEFAULT_USER = "meenatarun656";
const MAX_POSTS = 12;

export default async function handler(req, res) {
  const user = String(req.query?.user || DEFAULT_USER);
  if (!HANDLE.test(user)) {
    res.status(400).json({ error: "Invalid Medium handle" });
    return;
  }
  try {
    const upstream = await fetch(`https://medium.com/feed/@${user}`, {
      headers: { "user-agent": "Mozilla/5.0 (portfolio feed reader)", accept: "application/rss+xml, application/xml, text/xml" },
    });
    if (!upstream.ok) {
      res.status(upstream.status === 404 ? 404 : 502).json({ error: `Medium responded ${upstream.status}` });
      return;
    }
    const xml = await upstream.text();
    const posts = parseItems(xml).slice(0, MAX_POSTS);
    res.setHeader("cache-control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json({ user, posts });
  } catch {
    res.status(502).json({ error: "Medium feed unavailable" });
  }
}

function parseItems(xml) {
  return xml
    .split("<item>")
    .slice(1)
    .map((chunk) => chunk.split("</item>")[0])
    .map((item) => {
      const content = pick(item, "content:encoded") || pick(item, "description") || "";
      const text = stripTags(content);
      const words = text ? text.split(/\s+/).length : 0;
      return {
        title: decode(pick(item, "title")),
        link: (pick(item, "link") || "").split("?")[0],
        pubDate: toIso(pick(item, "pubDate")),
        categories: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => decode(m[1])).filter(Boolean),
        excerpt: excerpt(text, 190),
        thumbnail: firstImage(content),
        readMinutes: words ? Math.max(1, Math.round(words / 220)) : null,
      };
    })
    .filter((p) => p.title && p.link);
}

function pick(block, tag) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? m[1].replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1").trim() : "";
}

function stripTags(html) {
  return decode(
    html
      .replace(/<(script|style|figcaption)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function excerpt(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 60))}…`;
}

function firstImage(html) {
  for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/gi)) {
    const src = decode(m[1]);
    // Medium appends a 1x1 tracking pixel; skip it and any other non-content image.
    if (!/\/_\/stat|\.gif(\?|$)/i.test(src)) return src;
  }
  return null;
}

function toIso(rfc822) {
  const t = Date.parse(rfc822);
  return Number.isNaN(t) ? null : new Date(t).toISOString();
}

function decode(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}
