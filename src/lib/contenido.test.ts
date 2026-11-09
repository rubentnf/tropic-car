import { describe, expect, it } from 'vitest';
import { contenido, rellenarMarcadores } from '../i18n/contenido';
import { getDictionary, locales } from '../i18n/utils';
import { LUGARES } from './busqueda';

const forma = (valor: unknown): unknown =>
    Array.isArray(valor)
        ? valor.map(forma)
        : valor && typeof valor === 'object'
            ? Object.fromEntries(Object.entries(valor).map(([keyof, v]) => [keyof, forma(v)]))
            : typeof valor;

describe('idiomas', () => {
    it('los cinco idiomas del contenido tienen la misma estructura', () => {
        for (const lang of locales) expect(forma(contenido[lang]), lang).toEqual(forma(contenido.es));
    });
    it('los cinco diccionarios tienen la misma estructura', () => {
        for (const lang of locales) expect(forma(getDictionary(lang)), lang).toEqual(forma(getDictionary('es')));
    });
    it('ningún texto queda vacío', () => {
        const vacios = (valor: unknown, ruta: string): string[] =>
            typeof valor === 'string'
                ? valor.trim() === '' ? [ruta] : []
                : valor && typeof valor === 'object'
                    ? Object.entries(valor).flatMap(([k, v]) => vacios(v, `${ruta}.${k}`))
                    : [];
        for (const lang of locales) {
            expect(vacios(contenido[lang], `contenido.${lang}`)).toEqual([]);
            expect(vacios(getDictionary(lang), `dic.${lang}`)).toEqual([]);
        }
    });
    it('todos los lugares de recogida tienen texto en los cinco idiomas', () => {
        for (const lang of locales) {
            const lugares = getDictionary(lang).search.places as Record<string, string>;
            for (const lugar of LUGARES) expect(lugares[lugar], `${lang}.${lugar}`).toBeTruthy();
        }
    });
    it('rellena marcadores y deja los desconocidos tal cual', () => {
        expect(rellenarMarcadores('Hola {nombre} {otro}', { nombre: 'Ana' })).toBe('Hola Ana {otro}');
    });
});