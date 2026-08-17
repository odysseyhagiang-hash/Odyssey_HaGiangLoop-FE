export default async function handler(req, res) {
  const apiUrl = process.env.VITE_API_URL || process.env.BACKEND_URL || 'http://localhost:5000/api';
  const backendBase = apiUrl.replace(/\/api\/?$/, '');
  const sitemapEndpoint = `${backendBase}/sitemap.xml`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(sitemapEndpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`);
    }

    const xml = await response.text();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(xml);
  } catch (err) {
    console.error('[Vercel Sitemap Serverless] Error fetching from backend:', err.message);

    // Fallback sang file tĩnh public/sitemap.xml nếu Backend đang bận/khởi động
    try {
      const fs = await import('fs');
      const path = await import('path');
      const staticXmlPath = path.resolve(process.cwd(), 'public/sitemap.xml');
      if (fs.existsSync(staticXmlPath)) {
        const staticXml = fs.readFileSync(staticXmlPath, 'utf8');
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        return res.status(200).send(staticXml);
      }
    } catch (fallbackErr) {
      console.error('[Vercel Sitemap Serverless] Static fallback error:', fallbackErr);
    }

    return res.status(500).send('Error loading sitemap');
  }
}
