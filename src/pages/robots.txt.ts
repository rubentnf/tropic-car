import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
    const sitemap = site ? new URL('sitemap-index.xml', site).href : '/sitemap-index.xml';
    const cuerpo = ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${sitemap}`, ''].join('\n');
    return new Response(cuerpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};