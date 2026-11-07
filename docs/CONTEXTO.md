# Contexto del proyecto

## Cliente y encargo
- Cliente: Eduardo, Autos Tropic Canarias S.L. (Tropic Rent a Car), C.C. El Trébol, Costa del Silencio, Tenerife. Tel. 922 731 565 · tropiccanarias@hotmail.com.
- Desarrolla: Ruben (desarrollador frontend sénior, Santa Cruz de Tenerife). Trabajo freelance; precio aceptado: 2.000 €.
- Objetivo: web de alquiler de coches en 5 idiomas (es, en, de, fr, it), mobile-first, con calculadora de precio y **solicitud de reserva por correo**.
- Fuera de alcance: pago online y calendario de disponibilidad. La empresa confirma cada solicitud por teléfono o correo.

## Decisiones tomadas
- Stack: Astro 7 estático + adaptador Cloudflare (Workers) + Resend para el correo. Solo `/api/solicitud` se ejecuta en servidor.
- 14 grupos de coches (A, B, C, D, D.1, E, E.1, F, G, H, I, J, K, L) con tarifa por día según tramo: 1, 2-3, 4-6, 7+ días. El grupo I no tiene precio de 1 día.
- Precio total = días × tarifa del tramo + sillas × 5 € × días.
- Diseño: se parte de la **propuesta 1** (paleta suave: fondo #FAF7EE, amarillo #F5C842, carbón #232321; tipografía Archivo). El cliente aún no ha validado ningún diseño. Si elige otro, solo cambia la «piel» (`tokens.css` + clases de `global.css`); precios, búsqueda, solicitud, API, i18n y SEO no se tocan.
- Azul de marca del logo: #191D3A.
- Rutas `/{idioma}/…`, con `prefixDefaultLocale`. La raíz `/` redirige a `/es/`.
- Honeypot anti-spam en el campo `web`. Correo a la empresa siempre en español; acuse al cliente en su idioma.
- Sin `RESEND_API_KEY` los correos se simulan en la terminal.

## Prototipos de diseño
- Cinco propuestas estáticas alojadas en Cloudflare Pages (proyecto `tropic-propuestas`), con función `/api/feedback` que envía las valoraciones por Resend. El botón de WhatsApp usa el número 34634594158.

## Pendiente de confirmar con Eduardo
- Datos de empresa: CIF, código postal, Registro Mercantil, horario (`src/data/empresa.ts`).
- Textos de las preguntas frecuentes: seguro a todo riesgo, franquicia 150 €, no se bloquea importe en la tarjeta, forma de pago, edad 25-75 años y 5 años de carnet, entrega en aeropuerto/puerto/hotel.
- Textos legales: son plantillas; necesitan revisión profesional.
- Fotos: las actuales proceden de portales de alquiler, algunas con marca de agua y con modelos dudosos. Hay que sustituirlas por fotos con derechos.
- Foto de portada para la propuesta 5 y arreglos de contraste señalados por Impeccable (`npx impeccable detect`).

## Estructura
Ver `README.md`. Puntos clave: `src/lib/precios.ts` (cálculo), `src/lib/solicitud.ts` (validación y recálculo en servidor), `src/lib/emails.ts` (correos en 5 idiomas), `src/data/tarifas.json` (tarifas del flyer), `src/data/fotos.ts` (foto de cada modelo).

## Preferencias de trabajo de Ruben
- Guía paso a paso, archivos completos, y que se le diga exactamente dónde está un error.
- Idioma de trabajo: español.
