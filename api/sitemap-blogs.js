export default async function handler(req, res) {
  const apiUrl =
    process.env.VITE_API_URL ||
    process.env.BACKEND_URL ||
    process.env.RENDER_URL ||
    process.env.API_URL;

  if (apiUrl) {
    const backendBase = apiUrl.replace(/\/api\/?$/, '');
    const sitemapEndpoint = `${backendBase}/sitemap-blogs.xml`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(sitemapEndpoint, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const xml = await response.text();
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=120');
        return res.status(200).send(xml);
      }
    } catch (err) {
      console.error('[Vercel Blog Sitemap] Fetch error from Backend:', err.message);
    }
  }

  const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  return res.status(200).send(emptyXml);
}
