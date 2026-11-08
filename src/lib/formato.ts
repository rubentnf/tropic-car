import { regiones, type Locale } from '../i18n/utils';

export function formatearEuros(importe: number, lang: Locale): string {
    return new Intl.NumberFormat(regiones[lang].intl, {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(importe);
}

export function formatearFechaHora(fecha: Date, lang: Locale): string {
    return new Intl.DateTimeFormat(regiones[lang].intl, { dateStyle: 'medium', timeStyle: 'short' }).format(fecha);
}