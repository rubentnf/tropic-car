# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Turistas que alquilan coche en Tenerife. Hablan español, inglés, alemán, francés o italiano. Dos situaciones pesan por igual, y la web debe servir a las dos:

- **Antes de viajar:** preparan las vacaciones y buscan un coche para recogerlo al llegar a la isla, a menudo en el aeropuerto.
- **Ya en la isla:** están en su hotel o apartamento y buscan coche desde el móvil para los próximos días.

En ambos casos el trabajo es el mismo: saber cuánto cuesta el coche para sus fechas, fiarse de ese precio y dejar la solicitud hecha sin fricción.

La empresa es la segunda audiencia. Recibe cada solicitud por correo, siempre en español, y la confirma con el cliente.

## Product Purpose

Web de alquiler de coches de Autos Tropic Canarias S.L. (Tropic Rent a Car), en el C.C. El Trébol, Costa del Silencio, Tenerife. Permite elegir lugar, fechas y horas, ver los 14 grupos de vehículos con el precio por día y total, y enviar una solicitud de reserva.

El éxito es que el visitante envíe una solicitud válida, entendiendo cuánto va a pagar y que la empresa aún tiene que confirmársela.

## Positioning

- **Precio sin sorpresas:** el precio que se muestra ya lleva impuestos y seguro, no se paga nada en la web y no se añaden extras al recoger el coche (esto último, pendiente de confirmar: ver recargos más abajo).
- **Trato directo y local:** es una empresa de Costa del Silencio, y una persona confirma cada solicitud por teléfono o correo. El cliente no trata con un portal intermediario ni con una gran cadena.

## Operating Context

- Flujo: buscador, resultados con precio, solicitud con datos de contacto, correo de «solicitud en trámite» al cliente en su idioma, confirmación de la empresa por teléfono o correo.
- Lugares de recogida y devolución: oficina de Costa del Silencio, aeropuertos Tenerife Sur y Norte, hotel o alojamiento.
- Contacto de la empresa: +34 922 731 565 y tropiccanarias@hotmail.com.

## Capabilities and Constraints

- **Incluido:** calculadora de precio, solicitud por correo, páginas de flota, contacto con preguntas frecuentes y textos legales, en cinco idiomas (es, en, de, fr, it) y con enfoque mobile-first.
- **Fuera de alcance:** pago online y calendario de disponibilidad.
- **Precio:** total = días × tarifa del tramo + sillas × 5 € × días. Los tramos son 1, 2-3, 4-6 y 7 o más días, y el grupo I no tiene precio de 1 día. El servidor recalcula siempre el precio y nunca se fía del que envía el navegador.
- **Conductores:** requisitos de edad y carnet validados en la solicitud (ver «Pendiente de confirmar»).
- **Terminología:** «solicitud» (nunca «reserva confirmada» hasta que la empresa confirme), «grupo» de vehículos, modelos «o similar», «sillas infantiles».
- **Técnica:** Astro estático en Cloudflare Workers, con Resend para el correo. Solo `/api/solicitud` se ejecuta en servidor. Rutas `/{idioma}/…`.
- **Separación entre aspecto y lógica:** la apariencia puede cambiar sin tocar precios, búsqueda, solicitud, API, i18n ni SEO.
- **Textos:** todo texto visible existe en los cinco idiomas.

### Pendiente de confirmar con Eduardo

- Condiciones comerciales: seguro a todo riesgo, franquicia de 150 €, que no se bloquee importe en la tarjeta, forma de pago, conductores de 25 a 75 años con 5 años de carnet, y entrega en aeropuerto, puerto u hotel.
- Recargos que no aparecen en el flyer: entrega en aeropuerto, hotel o puerto, fuera de horario y devolución en otro lugar. También si las tarifas varían por temporada.
- Datos de empresa: CIF, Registro Mercantil y horario.
- Textos legales: son plantillas y necesitan revisión profesional.
- Diseño: el cliente aún no ha validado ninguno.

## Brand Commitments

- Nombre comercial: Tropic Rent a Car. Razón social: Autos Tropic Canarias S.L.
- Logo existente en `src/assets/logo.png`.
- Voz de los textos actuales: directa, sencilla y honesta sobre lo que todavía no está confirmado.

## Evidence on Hand

Existen, pero aún no están en el proyecto:

- **Reseñas en Google:** hay que recopilarlas antes de usarlas.
- **Años de trayectoria:** falta el dato exacto, que debe confirmar Eduardo.
- **Fotos propias:** previstas, de Eduardo y con derechos de uso.

Ya disponibles: tarifas de los 14 grupos en `src/data/tarifas.json`.

Las fotos actuales de `src/assets/modelos/` son provisionales: proceden de portales de alquiler, algunas llevan marca de agua y otras muestran modelos dudosos. Deben sustituirse antes de publicar.

No se pueden mostrar valoraciones, número de clientes, años ni testimonios hasta tener el dato real.

## Product Principles

1. **El precio que se ve es el que se confirma.** Ningún paso debe introducir un coste que el visitante no haya visto antes.
2. **Una solicitud no es una reserva.** Cada paso deja claro qué ha ocurrido y qué falta.
3. **Hay una persona detrás.** El contacto directo con la empresa está siempre a mano.
4. **Nadie queda en segundo plano.** La experiencia es igual de buena en móvil y en cualquiera de los cinco idiomas.
5. **Solo se afirma lo confirmado.** Lo que falta se marca como pendiente y no se publica como si fuera cierto.
