import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { defineConfig, envField } from 'astro/config';

// Dirección pública de la web. En producción se define SITE_URL al compilar
const site = process.env.SITE_URL ?? 'https://ejemplo.invalid';

export default defineConfig({
  site,
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),
  session: false,
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
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      EMAIL_DESTINO: envField.string({ context: 'server', access: 'secret', default: 'ruben.tnf@gmail.com' }),
      EMAIL_ORIGEN: envField.string({ context: 'server', access: 'secret', default: 'Tropic Rent a Car <onboarding@resend.dev>' }),
    }
  }
});
