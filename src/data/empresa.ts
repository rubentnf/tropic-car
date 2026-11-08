import type { Locale } from '../i18n/utils';

/**
 * Datos de la empresa. Todo lo que pone PENDIENTE hay que pedírselo al cliente:
 * se usa en el pie, en contacto y en los textos legales.
 */
export const empresa = {
    razonSocial: 'Autos Tropic Canarias S.L.',
    nombreComercial: 'Tropic Rent a Car',
    cif: '[CIF PENDIENTE]',
    domicilio: 'C.C. El Trébol, Costa del Silencio, Tenerife, 38630',
    registroMercantil: '[DATOS DEL REGISTRO MERCANTIL PENDIENTES]',
    email: 'tropiccanarias@hotmail.com',
    telefono: '+34 922 731 565',
    horario: {
        es: '[HORARIO DE LA OFICINA PENDIENTE]',
        en: '[OFFICE HOURS PENDING]',
        de: '[ÖFFNUNGSZEITEN AUSSTEHEND]',
        fr: '[HORAIRES À PRÉCISER]',
        it: '[ORARI DA DEFINIRE]',
    } satisfies Record<Locale, string>,
    /** Enlace a Google Maps: funciona sin claves ni cookies hasta que el usuario lo abre. */
    mapaEnlace: 'https://maps.app.goo.gl/fnmsZeTAEaGCvEZq5',
    /** URL para incrustrar el mapa (opcional). Vacío = no se muestra el mapa incrustrado. */
    mapaEmbedUrl: '',
};