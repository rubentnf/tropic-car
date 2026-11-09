import type { Contenido } from './tipos';

export const es: Contenido = {
    footer: { avisoLegal: 'Aviso legal', privacidad: 'Privacidad', cookies: 'Cookies', configurarCookies: 'Configurar cookies' },
    flota: {
        titulo: 'Nuestra flota',
        intro: 'Catorce grupos de vehículos. Precio por día según la duración del alquiler, con impuestos y seguro incluidos.',
        tramos: { '1': '1 día', '2-3': '2-3 días', '4-6': '4-6 días', '7+': '7 o más' },
        nota: 'Los modelos son orientativos, «o similar». El precio total se calcula al elegir fechas.',
        reservar: 'Ver precio para mis fechas',
    },
    contacto: {
        titulo: 'Contacto',
        direccion: 'Dirección',
        telefono: 'Teléfono',
        email: 'Email',
        horario: 'Horario',
        abrirMapa: 'Abrir en Google Maps',
        cargarMapa: 'Cargar mapa aquí',
        mapaTitulo: 'Mapa',
        preguntasTitulo: 'Preguntas frecuentes',
        preguntas: [
            { pregunta: '¿Dónde puedo recoger y devolver el coche?', respuesta: 'En toda la isla: nuestra oficina de Costa del Silencio, los aeropuertos, los puertos, hoteles, apartamentos y domicilios particulares. Indica el lugar y la dirección al enviar la solicitud y te confirmamos las condiciones.' },
            { pregunta: '¿Qué requisitos tiene que cumplir el conductor?', respuesta: 'Tener entre 25 y 75 años y al menos 5 años de carnet de conducir.' },
            { pregunta: '¿Qué incluye el precio?', respuesta: 'Impuestos y seguro a todo riesgo. La franquicia es de 150 € y no se bloquea ninguna cantidad en tu tarjeta.' },
            { pregunta: '¿Mi solicitud es ya una reserva?', respuesta: 'No. Al enviarla recibes un email de que está en trámite; la confirmamos contigo por teléfono o email.' },
            { pregunta: '¿Se puede pagar online?', respuesta: 'No. No se paga nada al enviar la solicitud; las condiciones de pago se acuerdan al confirmarla. [CONFIRMAR CON LA EMPRESA]' },
            { pregunta: '¿Tenéis sillas infantiles?', respuesta: 'Sí: maxicosi, silla y elevador, a 5 € por día.' },
        ],
    },
    consentimiento: {
        texto: 'Usamos una herramienta de estadísticas para mejorar la web, solo si la aceptas. Puedes cambiarlo cuando quieras.',
        aceptar: 'Aceptar',
        rechazar: 'Rechazar',
    },
    legal: {
        aviso: 'Plantilla pendiente de completar con los datos de la empresa y de revisar por un profesional antes de publicar.',
        titulos: { avisoLegal: 'Aviso legal', privacidad: 'Política de privacidad', cookies: 'Política de cookies' },
        avisoLegal: [
            { titulo: 'Titular de la web', parrafos: ['Esta web pertenece a {razonSocial} (nombre comercial {nombreComercial}), con CIF {cif} y domicilio en {domicilio}.', 'Datos registrales: {registroMercantil}.', 'Contacto: {email} · {telefono}.'] },
            { titulo: 'Objeto', parrafos: ['La web ofrece información sobre los vehículos de alquiler y permite enviar solicitudes de reserva. El envío de una solicitud no constituye una reserva confirmada: esta solo existe cuando la empresa la confirma al cliente.'] },
            { titulo: 'Precios', parrafos: ['Los precios mostrados incluyen impuestos y seguro. El precio definitivo es el confirmado por la empresa al aceptar la solicitud.'] },
            { titulo: 'Propiedad intelectual', parrafos: ['Los textos, el diseño y el resto de contenidos de la web pertenecen a su titular o se usan con permiso. No se pueden reproducir sin autorización.'] },
            { titulo: 'Responsabilidad y legislación', parrafos: ['El titular procura que la información sea correcta y se reserva el derecho a actualizarla. Estas condiciones se rigen por la legislación española.'] },
        ],
        privacidad: [
            { titulo: 'Responsable', parrafos: ['{razonSocial}, CIF {cif}, {domicilio}. Contacto: {email}.'] },
            { titulo: 'Qué datos tratamos y para qué', parrafos: ['Cuando envías una solicitud: nombre, teléfono, email, edad, años de carnet, número de vuelo (opcional), comentarios y los datos del alquiler que has elegido.', 'Los usamos para responder a tu solicitud y gestionar la reserva. La base legal es la aplicación de medidas precontractuales a petición tuya (art. 6.1.b del RGPD).'] },
            { titulo: 'Cómo se envían y quién los recibe', parrafos: ['La web no guarda las solicitudes en una base de datos: se envían por correo electrónico a la empresa y se te envía un acuse de recibo.', 'Para ello intervienen proveedores que tratan datos por cuenta de la empresa: el servicio de envío de correo (Resend) y el alojamiento de la web (Cloudflare). [REVISAR TRANSFERENCIAS INTERNACIONALES]'] },
            { titulo: 'Conservación', parrafos: ['Conservaremos tus datos durante el tiempo necesario para gestionar la solicitud y, después, durante los plazos que exija la ley. [PLAZO PENDIENTE]'] },
            { titulo: 'Tus derechos', parrafos: ['Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a {email}.', 'Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).'] },
        ],
        cookies: [
            { titulo: 'Qué son las cookies', parrafos: ['Son pequeños archivos que una web guarda en tu dispositivo. Esta web no usa cookies propias para funcionar.'] },
            { titulo: 'Qué guardamos', parrafos: ['Guardamos en tu navegador una sola preferencia técnica: tu elección sobre las estadísticas (aceptar o rechazar). No contiene datos personales.', 'Si aceptas las estadísticas, se carga una herramienta de análisis de visitas ({herramienta}) que mide el uso de la web. Si las rechazas, no se carga.'] },
            { titulo: 'Cómo cambiar tu elección', parrafos: ['Pulsa "Configurar cookies" al final de cualquier página, o borra los datos de la web en tu navegador.'] },
        ],
    },
};