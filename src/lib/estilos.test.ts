import { describe, expect, it } from 'vitest';
import estilos from '../styles/global.css?raw';
import tokens from '../styles/tokens.css?raw';

const css = tokens + estilos;

describe('estilos', () => {
    it('toda variable CSS que se usa está definida', () => {
        const definidas = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
        const usadas = [...css.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]);
        expect(usadas.filter((v) => !definidas.has(v))).toEqual([]);
    });
});
