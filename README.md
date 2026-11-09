# Tropic Rent a Car · web de reservas

Web de alquiler de coches para **Autos Tropic Canarias S.L.** (Tropic Rent a Car, Costa del Silencio, Tenerife). El cliente elige lugar, fechas y horas, ve los 14 grupos de vehículos con el **precio total y por día** y envía una **solicitud de reserva** por correo. No hay pago online ni calendario de disponibilidad: la empresa confirma cada solicitud con el cliente.

## Qué hace

- Buscador por lugar de recogida y devolución, fechas y horas.
- Resultados con precio total y por día, calculado por tramos de duración (1, 2-3, 4-6 y 7+ días) y sillas infantiles.
- Formulario de solicitud: llega un correo a la empresa y el cliente recibe un aviso automático de «solicitud en trámite».
- Páginas de flota, contacto con preguntas frecuentes, aviso legal, privacidad y cookies.
- Web en cinco idiomas (`/es/`, `/en/`, `/de/`, `/fr/`, `/it/`), pensada primero para móvil.
- SEO básico: canonical, hreflang, sitemap, `robots.txt` y datos estructurados.
- Panel `/admin/` para que el cliente edite precios, modelos y datos de la empresa sin tocar código.

## Tecnología

| Pieza                                 | Uso                                                           |
| ------------------------------------- | ------------------------------------------------------------- |
| [Astro](https://astro.build) 7        | Sitio estático; solo `/api/solicitud` se ejecuta en servidor  |
| TypeScript                            | Lógica de precios, validación y correos                       |
| Vitest                                | Tests de precios, búsqueda, solicitud, contenidos y SEO       |
| [Resend](https://resend.com)          | Envío de correos                                              |
| Cloudflare Workers                    | Hosting, con `@astrojs/cloudflare` y `wrangler`               |
| [Sveltia CMS](https://sveltiacms.app) | Panel `/admin/` que guarda los cambios como commits en GitHub |

## Requisitos

- Node.js 22.12 o superior (hay un `.nvmrc`)
- npm

## Puesta en marcha

```bash
npm install
cp .env.example .env   # opcional en local
npm run dev            # http://localhost:4321
```

Sin `RESEND_API_KEY`, los correos **no se envían**: se imprimen en la terminal como `[correo simulado]`, así que se puede probar todo el flujo sin cuenta ni coste.

## Scripts

| Comando           | Qué hace                          |
| ----------------- | --------------------------------- |
| `npm run dev`     | Servidor de desarrollo            |
| `npm run build`   | Compila el sitio en `dist/`       |
| `npm run preview` | Sirve la compilación en local     |
| `npm run check`   | Comprueba tipos con `astro check` |
| `npm test`        | Ejecuta los tests con Vitest      |

## Variables de entorno

Nunca se suben a git. En local van en `.env`; en producción, en el panel de Cloudflare.

| Variable                  | Tipo              | Para qué                                                         |
| ------------------------- | ----------------- | ---------------------------------------------------------------- |
| `RESEND_API_KEY`          | Secreto, opcional | Clave de Resend. Sin ella, los correos se simulan                |
| `EMAIL_DESTINO`           | Secreto           | Correo donde la empresa recibe las solicitudes                   |
| `EMAIL_ORIGEN`            | Secreto           | Remitente, por ejemplo `Tropic Rent a Car <reservas@tu-dominio>` |
| `SITE_URL`                | Variable de build | URL pública (canonical, sitemap, `robots.txt`)                   |
| `PUBLIC_UMAMI_WEBSITE_ID` | Pública, opcional | Activa las estadísticas y el banner de cookies                   |
| `PUBLIC_UMAMI_SRC`        | Pública, opcional | Script de Umami (por defecto, el de Umami Cloud)                 |

Las variables `PUBLIC_*` y `SITE_URL` se incrustan al compilar: si las cambias, hay que volver a compilar y desplegar.

## Estructura

```text
src/
  assets/       logo y fotos de los modelos (src/assets/modelos)
  components/   Buscador, galería, tarjetas de flota y de resultados, pasos y banner de cookies
  data/         tarifas.json (14 grupos) y empresa.json (datos de la empresa)
  i18n/         diccionarios de los cinco idiomas y textos largos (legales, preguntas frecuentes)
  layouts/      Base.astro (cabecera, pie, metaetiquetas)
  lib/          precios, búsqueda, solicitud, correos, SEO (con sus tests)
  pages/        rutas por idioma y /api/solicitud
  scripts/      JavaScript del navegador (resultados y solicitud)
  styles/       tokens.css (la «piel»: colores, radios) y global.css (componentes)
public/         _headers (cabeceras de seguridad) y admin/ (panel de edición)
```

## Panel de edición

`/admin/` es un panel (Sveltia CMS) donde el cliente cambia los precios, los modelos y los datos de la empresa. Cada cambio se guarda como un commit en GitHub y Cloudflare vuelve a publicar la web en uno o dos minutos. No hay base de datos ni servidor extra.

Para activarlo:

1. En `public/admin/config.yml`, cambia `repo: CAMBIAR-USUARIO/tropic-web` por el repositorio real.
2. Crea un token fine-grained en GitHub (Settings → Developer settings → Fine-grained tokens) limitado a ese repositorio, con permisos *Contents: Read and write* y *Metadata: Read-only*.
3. Entra en `https://tu-dominio/admin/`, elige «Iniciar sesión con token» y pega el token. El navegador lo recuerda.

Si añades un campo a `tarifas.json` o `empresa.json`, déclaralo también en `config.yml`: el test `src/lib/cms.test.ts` falla si falta, porque el panel borraría ese campo al guardar. Los textos de la web (traducciones, preguntas frecuentes, textos legales) no se editan desde el panel: están en `src/i18n/`.

## Cómo se calcula el precio

`precio total = días × tarifa del tramo + sillas infantiles × 5 € × días`

Los días se cuentan en bloques de 24 horas desde la hora de recogida. Las tarifas están en `src/data/tarifas.json` y la lógica en `src/lib/precios.ts`. El servidor **recalcula el precio** con los datos de la búsqueda y no se fía del que envía el navegador.

## Despliegue

Cloudflare Workers.

```bash
SITE_URL=https://tu-dominio npm test && npx astro build
npx wrangler deploy
```

También se puede conectar el repositorio a Workers Builds (comando de build `npx astro build`, de despliegue `npx wrangler deploy`). Antes de publicar:

1. Configura las variables de entorno en Cloudflare.
2. Verifica el dominio en Resend (registros SPF y DKIM).
3. Comprueba que no quedan datos pendientes: `grep -rn PENDIENTE src` debe salir vacío.

`npx wrangler deploy --dry-run` valida la configuración sin publicar nada.

## Convenciones de Git

- Commits en español siguiendo [Conventional Commits](https://www.conventionalcommits.org): `feat(precios): calcula el total por tramos`.
- Una rama por fase (`fase-N-nombre`), fusionada con `--no-ff`, y una etiqueta `fase-N` al terminar.
- Las etiquetas `hito-N` marcan las entregas de pago del proyecto.

## Pendiente

- Datos de la empresa marcados como `PENDIENTE` en `src/data/empresa.ts`.
- Revisión profesional de los textos legales, que ahora son plantillas.
- Fotografías de los vehículos con derechos de uso (las actuales son provisionales y algunas llevan marcas de agua de portales).
- Datos de la empresa marcados como `PENDIENTE` en `src/data/empresa.json` (o desde el panel).
- Forma de pago: la pregunta frecuente «¿Se puede pagar online?» sigue marcada `[CONFIRMAR CON LA EMPRESA]`.
- Teléfono que irá en la web: el fijo 922 731 565 o el 648 474 084 que dio en el cuestionario.
- Si la columna del flyer (5, 3, 9) son puertas o plazas, para mostrar las puertas en cada coche.
- Recargos por entrega fuera de la oficina, de madrugada o por devolver en otro lugar.
- Cuenta de GitHub y token para que el cliente use el panel, o decidir que los cambios los haga el desarrollador.

El contexto completo del proyecto para Claude Code está en `CLAUDE.md` y `docs/CONTEXTO.md`.

## Licencia

Proyecto privado de Autos Tropic Canarias S.L. Todos los derechos reservados.