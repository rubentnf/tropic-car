import type { Contenido } from './tipos';

export const en: Contenido = {
    footer: { avisoLegal: 'Legal notice', privacidad: 'Privacy', cookies: 'Cookies', configurarCookies: 'Cookie settings' },
    flota: {
        titulo: 'Our fleet',
        intro: 'Fourteen vehicle groups. Price per day depending on the rental length, with taxes and insurance included.',
        tramos: { '1': '1 day', '2-3': '2-3 days', '4-6': '4-6 days', '7+': '7 or more' },
        nota: 'Models are indicative, "or similar". The total price is calculated when you choose your dates.',
        reservar: 'See the price for my dates',
    },
    contacto: {
        titulo: 'Contact',
        direccion: 'Address',
        telefono: 'Phone',
        email: 'Email',
        horario: 'Opening hours',
        abrirMapa: 'Open in Google Maps',
        cargarMapa: 'Load map here',
        preguntasTitulo: 'Frequently asked questions',
        preguntas: [
            { pregunta: 'What are the driver requirements?', respuesta: 'Drivers must be between 25 and 75 years old and have held a driving licence for at least 5 years.' },
            { pregunta: 'What is included in the price?', respuesta: 'Taxes and full-risk insurance. The excess is 150 € and no amount is held on your card.' },
            { pregunta: 'Is my request already a booking?', respuesta: 'No. After sending it you receive an email saying it is being processed; we confirm it with you by phone or email.' },
            { pregunta: 'Can I pay online?', respuesta: 'No. Nothing is paid when you send the request; payment terms are agreed when it is confirmed. [CONFIRM WITH THE COMPANY]' },
            { pregunta: 'Do you have child seats?', respuesta: 'Yes: baby seat, child seat and booster, at 5 € per day.' },
        ],
    },
    consentimiento: {
        texto: 'We use a statistics tool to improve the website, only if you accept. You can change this at any time.',
        aceptar: 'Accept',
        rechazar: 'Reject',
    },
    legal: {
        aviso: 'Template pending completion with the company details and professional review before publishing. The Spanish version prevails.',
        titulos: { avisoLegal: 'Legal notice', privacidad: 'Privacy policy', cookies: 'Cookie policy' },
        avisoLegal: [
            { titulo: 'Website owner', parrafos: ['This website belongs to {razonSocial} (trading as {nombreComercial}), tax ID {cif}, registered at {domicilio}.', 'Registry details: {registroMercantil}.', 'Contact: {email} · {telefono}.'] },
            { titulo: 'Purpose', parrafos: ['The website provides information about rental vehicles and lets you send booking requests. Sending a request is not a confirmed booking: a booking only exists once the company confirms it to the customer.'] },
            { titulo: 'Prices', parrafos: ['Prices shown include taxes and insurance. The final price is the one confirmed by the company when it accepts the request.'] },
            { titulo: 'Intellectual property', parrafos: ['Texts, design and other content belong to the owner or are used with permission. They may not be reproduced without authorisation.'] },
            { titulo: 'Liability and governing law', parrafos: ['The owner aims to keep the information correct and may update it. These terms are governed by Spanish law.'] },
        ],
        privacidad: [
            { titulo: 'Controller', parrafos: ['{razonSocial}, tax ID {cif}, {domicilio}. Contact: {email}.'] },
            { titulo: 'What data we process and why', parrafos: ['When you send a request: name, phone, email, age, years of licence, flight number (optional), comments and the rental details you chose.', 'We use them to answer your request and manage the booking. The legal basis is taking pre-contractual steps at your request (art. 6.1.b GDPR).'] },
            { titulo: 'How they are sent and who receives them', parrafos: ['The website does not store requests in a database: they are emailed to the company and you receive an acknowledgement.', 'Providers acting on behalf of the company are involved: the email sending service (Resend) and the website hosting (Cloudflare). [REVIEW INTERNATIONAL TRANSFERS]'] },
            { titulo: 'Retention', parrafos: ['We keep your data for as long as needed to handle the request and afterwards for the periods required by law. [PERIOD PENDING]'] },
            { titulo: 'Your rights', parrafos: ['You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to {email}.', 'If you think we have not handled your data properly, you can complain to the Spanish Data Protection Agency (www.aepd.es).'] },
        ],
        cookies: [
            { titulo: 'What cookies are', parrafos: ['They are small files a website stores on your device. This website does not use its own cookies to work.'] },
            { titulo: 'What we store', parrafos: ['We store a single technical preference in your browser: your choice about statistics (accept or reject). It contains no personal data.', 'If you accept statistics, a visit analytics tool ({herramienta}) is loaded to measure use of the website. If you reject them, it is not loaded.'] },
            { titulo: 'How to change your choice', parrafos: ['Click "Cookie settings" at the bottom of any page, or clear the site data in your browser.'] },
        ],
    },
};