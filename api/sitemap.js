const SITE_URL = 'https://www.odysseyhagiangloop.com';

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/journeys', priority: '0.9', changefreq: 'weekly' },
  { path: '/journeys/private-tour', priority: '0.8', changefreq: 'weekly' },
  { path: '/journeys/group-tour', priority: '0.8', changefreq: 'weekly' },
  { path: '/journeys/car-tour', priority: '0.8', changefreq: 'weekly' },
  { path: '/journeys/jeep-tour', priority: '0.8', changefreq: 'weekly' },
  { path: '/journeys/ha-giang-cao-bang', priority: '0.8', changefreq: 'weekly' },
  { path: '/journeys/luxury-tour', priority: '0.8', changefreq: 'weekly' },
  { path: '/destinations', priority: '0.9', changefreq: 'weekly' },
  { path: '/destinations/nho-que-canyon', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/ma-pi-leng-pass', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/quan-ba-heavens-gate', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/lung-khuy-cave', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/khau-lan-waterfall', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/lung-tam-weaving-village', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/yen-minh-town', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/tham-ma-pass', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/hmong-kings-palace', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/lung-cu-flag-point', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/vietnam-north-point', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/dong-van-ancient-town', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/ban-an-stream-ngoc-long', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/du-gia-valley', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/du-gia-waterfall', priority: '0.7', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.6', changefreq: 'monthly' },
  { path: '/rentalbikes', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/booking', priority: '0.9', changefreq: 'weekly' },
];

const FALLBACK_BLOGS = [
  'first-timers-guide-ha-giang-loop',
  'packing-for-ha-giang-what-to-bring',
  'the-case-for-staying-an-extra-night',
  'ma-pi-leng-pass-complete-guide',
  'dong-van-sunday-market-guide',
  'hoang-su-phi-terraces-harvest-season',
];

function generateFallbackSitemap() {
  const today = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const route of STATIC_ROUTES) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  }
  for (const slug of FALLBACK_BLOGS) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/blog/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `</urlset>\n`;
  return xml;
}

export default async function handler(req, res) {
  const apiUrl =
    process.env.VITE_API_URL ||
    process.env.BACKEND_URL ||
    process.env.RENDER_URL ||
    process.env.API_URL;

  if (apiUrl) {
    const backendBase = apiUrl.replace(/\/api\/?$/, '');
    const sitemapEndpoint = `${backendBase}/sitemap.xml`;

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
      console.warn(`[Vercel Sitemap] Backend returned status ${response.status}`);
    } catch (err) {
      console.error('[Vercel Sitemap] Fetch error from Backend:', err.message);
    }
  } else {
    console.warn('[Vercel Sitemap] VITE_API_URL is not defined in environment variables');
  }

  // Fallback sang sitemap chuẩn nếu backend chưa cấu hình hoặc tạm thời không phản hồi
  const fallbackXml = generateFallbackSitemap();
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');
  return res.status(200).send(fallbackXml);
}
