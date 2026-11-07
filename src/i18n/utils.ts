import es from './es.json';
import en from './en.json';
import de from './de.json';
import fr from './fr.json';
import it from './it.json';

export const locales = ['es', 'en', 'de', 'fr', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/** Región para formatear números y fechas, y valor de og:locale.  */
export const regiones: Record<Locale, { intl: string; og: string }> = {
    es: { intl: 'es-ES', og: 'es_ES' },
    en: { intl: 'en-GB', og: 'en_GB' },
    de: { intl: 'de-DE', og: 'de_DE' },
    fr: { intl: 'fr-FR', og: 'fr_FR' },
    it: { intl: 'it-IT', og: 'it_IT' },
};

const dictionaries = { es, en, de, fr, it } satisfies Record<Locale, unknown>;
export type Dictionary = typeof es;

export function isLocale(valor: string | undefined): valor is Locale {
    return !!valor && (locales as readonly string[]).includes(valor);
}

export function getDictionary(lang: Locale): Dictionary {
    return dictionaries[lang];
}

export function localizedPath(lang: Locale, ruta = ''): string {
    const limpia = ruta.replace(/^\/+|\/+$/g, '');
    return limpia ? `/${lang}/${limpia}/` : `/${lang}/`;
}