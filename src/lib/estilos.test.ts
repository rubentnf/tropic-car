import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Se leen del disco: con `?raw` vitest entrega los .css vacíos y los tests pasarían sin comprobar nada.
const leer = (archivo: string) => readFileSync(new URL(`../styles/${archivo}`, import.meta.url), 'utf8');
const tokens = leer('tokens.css');
const estilos = leer('global.css');
const css = tokens + estilos;

/** Nombres de las variables declaradas en el bloque que empieza por `selector {`. */
function variablesDe(selector: string): string[] {
    const inicio = tokens.indexOf(selector + ' {');
    if (inicio === -1) throw new Error(`No está el bloque ${selector} en tokens.css`);
    const bloque = tokens.slice(inicio, tokens.indexOf('}', inicio));
    return [...bloque.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]).sort();
}

describe('estilos', () => {
    it('lee los archivos de verdad', () => {
        expect(tokens.length).toBeGreaterThan(100);
        expect(estilos.length).toBeGreaterThan(100);
    });

    it('toda variable CSS que se usa está definida', () => {
        const definidas = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
        const usadas = [...css.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]);
        expect(usadas.length).toBeGreaterThan(0);
        expect(usadas.filter((v) => !definidas.has(v))).toEqual([]);
    });

    it('el tema claro y el oscuro definen las mismas variables', () => {
        const claro = variablesDe(':root');
        expect(claro.length).toBeGreaterThan(0);
        expect(variablesDe(":root[data-tema='oscuro']")).toEqual(claro);
    });

    it('global.css no escribe colores a mano: viven en tokens.css', () => {
        expect(estilos.match(/#[0-9a-f]{3,8}\b/gi) ?? []).toEqual([]);
    });

    it('no queda ninguna referencia a la variable antigua --carbon', () => {
        expect(css).not.toMatch(/var\(--carbon/);
    });
});
