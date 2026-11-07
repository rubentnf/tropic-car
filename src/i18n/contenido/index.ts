import type { Locale } from '../utils';
import { de } from './de';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { it } from './it';
import type { Contenido } from './tipos';

export type { Contenido, PreguntaFrecuente, Seccion } from './tipos';

export const contenido: Record<Locale, Contenido> = { es, en, de, fr, it };

export function getContenido(lang: Locale): Contenido {
    return contenido[lang];
}

/** Sustituye {clave} por su valor en un texto con marcadores. */
export function rellenarMarcadores(texto: string, valores: Record<string, string>): string {
    return texto.replace(/\{(\w+)\}/g, (_, clave: string) => valores[clave] ?? `{${clave}}`);
}