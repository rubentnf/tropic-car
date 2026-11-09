import type { Locale } from '../i18n/utils';
import type { Lugar } from './busqueda';
import { formatearEuros, formatearFechaHora } from './formato';
import type { Solicitud } from './solicitud';

export interface Correo {
    to: string;
    subject: string;
    text: string;
    replyTo?: string;
}

/** Textos del resumen y del acuse que recibe el cliente, en el idioma de la web. */
interface Textos {
    lugares: Record<Lugar, string>;
    direccion: string;
    grupo: string;
    similar: string;
    recogida: string;
    devolucion: string;
    dias: (n: number, precio: string) => string;
    sillas: string;
    total: string;
    impuestos: string;
    asunto: string;
    saludo: (nombre: string) => string;
    cuerpo: string;
}

const TEXTOS: Record<Locale, Textos> = {
    es: {
        lugares: { office: 'Oficina Costa del Silencio', airportSouth: 'Aeropuerto Tenerife Sur', airportNorth: 'Aeropuerto Tenerife Norte', port: 'Puerto', hotel: 'Hotel o alojamiento', address: 'Apartamento o domicilio' },
        direccion: 'Dirección de entrega/recogida',
        grupo: 'Grupo', similar: 'o similar', recogida: 'Recogida', devolucion: 'Devolucion', dias: (n, p) => `Días: ${n} a ${p} por día`, sillas: 'Sillas infantiles', total: 'Total', impuestos: 'impuestos y seguro incluidos',
        asunto: 'Hemos recibido tu solicitud - Tropic Rent a Car',
        saludo: (n) => `Hola ${n},`,
        cuerpo: 'Tu solicitud está en trámite. Todavía no es una reserva confirmada: la revisaremos y te contactaremos en breve para confirmarla.',
    },
    en: {
        lugares: { office: 'Costa del Silencio office', airportSouth: 'Tenerife South Airport', airportNorth: 'Tenerife North Airport', port: 'Port', hotel: 'Hotel or accommodation', address: 'Apartment or private address' },
        direccion: 'Delivery/pick-up address',
        grupo: 'Group', similar: 'or similar', recogida: 'Pick-up', devolucion: 'Return',
        dias: (n, p) => `Days: ${n} at ${p} per day`, sillas: 'Child seats', total: 'Total', impuestos: 'taxes and insurance included',
        asunto: 'We have received your request - Tropic Rent a Car',
        saludo: (n) => `Hello ${n},`,
        cuerpo: 'Your request is being processed. It is not a confirmed booking yet: we will check it and contact you shortly to confirm.',
    },
    de: {
        lugares: { office: 'Büro Costa del Silencio', airportSouth: 'Flughafen Teneriffa Süd', airportNorth: 'Flughafen Teneriffa Nord', port: 'Hafen', hotel: 'Hotel oder Unterkunft', address: 'Apartment oder Privatadresse' },
        direccion: 'Adresse für Übergabe/Rückgabe',
        grupo: 'Gruppe', similar: 'oder ähnlich', recogida: 'Abholung', devolucion: 'Rückgabe',
        dias: (n, p) => `Tage: ${n} zu ${p} pro Tag`, sillas: 'Kindersitze', total: 'Gesamt', impuestos: 'Steuern und Versicherung inklusive',
        asunto: 'Wir haben Ihre Anfrage erhalten - Tropic Rent a Car',
        saludo: (n) => `Guten Tag ${n},`,
        cuerpo: 'Ihre Anfrage wird bearbeitet. Es ist noch keine bestätigte Buchung: Wir prüfen sie und melden uns in Kürze bei Ihnen, um sie zu bestätigen.',
    },
    fr: {
        lugares: { office: 'Agence Costa del Silencio', airportSouth: 'Aéroport de Tenerife Sud', airportNorth: 'Aéroport de Tenerife Nord', port: 'Port', hotel: 'Hôtel ou hébergement', address: 'Appartement ou adresse privée' },
        direccion: 'Adresse de livraison/restitution',
        grupo: 'Groupe', similar: 'ou similaire', recogida: 'Prise en charge', devolucion: 'Restitution',
        dias: (n, p) => `Jours : ${n} à ${p} par jour`, sillas: 'Sièges enfant', total: 'Total', impuestos: 'taxes et assurance incluses',
        asunto: 'Nous avons reçu votre demande - Tropic Rent a Car',
        saludo: (n) => `Bonjour ${n},`,
        cuerpo: 'Votre demande est en cours de traitement. Ce n’est pas encore une réservation confirmée : nous allons l’examiner et vous contacter très bientôt pour la confirmer.',
    },
    it: {
        lugares: { office: 'Ufficio Costa del Silencio', airportSouth: 'Aeroporto di Tenerife Sud', airportNorth: 'Aeroporto di Tenerife Nord', port: 'Porto', hotel: 'Hotel o alloggio', address: 'Appartamento o indirizzo privato' },
        direccion: 'Indirizzo di consegna/riconsegna',
        grupo: 'Gruppo', similar: 'o simile', recogida: 'Ritiro', devolucion: 'Riconsegna',
        dias: (n, p) => `Giorni: ${n} a ${p} al giorno`, sillas: 'Seggiolini per bambini', total: 'Totale', impuestos: 'tasse e assicurazione incluse',
        asunto: 'Abbiamo ricevuto la tua richiesta - Tropic Rent a Car',
        saludo: (n) => `Ciao ${n},`,
        cuerpo: 'La tua richiesta è in elaborazione. Non è ancora una prenotazione confermata: la verificheremo e ti contatteremo a breve per confermarla.',
    },
};

function resumen(s: Solicitud, lang: Locale): string[] {
    const p = s.presupuesto;
    const t = TEXTOS[lang];
    const modelos = s.grupo.models.map((m) => m.name).join(', ');
    const euros = (n: number) => formatearEuros(n, lang);
    const fecha = (d: Date) => formatearFechaHora(d, lang);
    return [
        `${t.grupo} ${s.grupo.id}: ${modelos} (${t.similar})`,
        `${t.recogida}: ${t.lugares[s.busqueda.lugarRecogida]}, ${fecha(s.busqueda.recogida)}`,
        `${t.devolucion}: ${t.lugares[s.busqueda.lugarDevolucion]}, ${fecha(s.busqueda.devolucion)}`,
        ...(s.direccion ? [`${t.direccion}: ${s.direccion}`] : []),
        t.dias(p.dias, euros(p.precioDia)),
        `${t.sillas}: ${p.sillas}`,
        `${t.total}: ${euros(p.total)} (${t.impuestos})`,
    ];
}

/** Aviso para la empresa: siempre en español con todos los datos para contestar al cliente. */
export function correoParaEmpresa(s: Solicitud, destino: string): Correo {
    const fecha = (d: Date) => formatearFechaHora(d, 'es');
    const lineas = [
        'Nueva solicitud de reserva (pendiente de confirmar)',
        '',
        ...resumen(s, 'es'),
        '',
        'Datos del cliente',
        `Nombre: ${s.nombre}`,
        `Teléfono: ${s.telefono}`,
        `Email: ${s.email}`,
        `Edad: ${s.edad} · Años de carnet: ${s.anosCarnet}`,
        `Vuelo: ${s.vuelo || 'no indicado'}`,
        `Idioma de la web: ${s.lang}`,
        '',
        'Comentarios:',
        s.comentarios || '(ninguno)',
    ];
    return {
        to: destino,
        replyTo: s.email,
        subject: `Nueva solicitud: grupo ${s.grupo.id} · ${fecha(s.busqueda.recogida)} · ${s.nombre}`,
        text: lineas.join('\n'),
    };
}

/** Aviso automático para el cliente: solicitud recibida, todavía no confirmada. */
export function correoParaCliente(s: Solicitud): Correo {
    const t = TEXTOS[s.lang];
    return {
        to: s.email,
        subject: t.asunto,
        text: [t.saludo(s.nombre), '', t.cuerpo, '', ...resumen(s, s.lang), '', 'Tropic Rent a Car · Autos Tropic Canarias S.L.'].join('\n'),
    };
}