import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// Dirección pública de la web. En producción se define SITE_URL al compilar
const site = process.env.SITE_URL ?? 'https://ejemplo.invalid';

export default defineConfig({
  site,
  output: 'static',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-GB', de: 'de-DE', fr: 'fr-FR', it: 'it-IT' } },
      // Fuera del mapa: la raiz (solo redirige a /es/) y las páginas que dependen de la búsqueda del usuario.
      filter: (pagina) => new URL(pagina).pathname !== '/' && !/\/(resultados|solicitud|gracias)\/?$/.test(pagina),
    }),
  ],
  i18n: {
    locales: ['es', 'en', 'de', 'fr', 'it'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: true },
  },
});
