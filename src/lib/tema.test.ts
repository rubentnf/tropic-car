import { describe, expect, it } from 'vitest';
import { alternarTema, esTema, temaInicial } from './tema';

describe('temaInicial', () => {
    it('usa el tema del dispositivo si no hay nada guardado', () => {
        expect(temaInicial(null, true)).toBe('oscuro');
        expect(temaInicial(null, false)).toBe('claro');
    });
    it('lo que la persona eligió manda sobre el dispositivo', () => {
        expect(temaInicial('claro', true)).toBe('claro');
        expect(temaInicial('oscuro', false)).toBe('oscuro');
    });
    it('ignora valores guardados que no son un tema', () => {
        expect(temaInicial('rojo', true)).toBe('oscuro');
        expect(temaInicial('', false)).toBe('claro');
    });
});

describe('alternarTema', () => {
    it('cambia de un tema al otro', () => {
        expect(alternarTema('claro')).toBe('oscuro');
        expect(alternarTema('oscuro')).toBe('claro');
    });
    it('sin tema previo pasa a oscuro', () => {
        expect(alternarTema(undefined)).toBe('oscuro');
    });
});

describe('esTema', () => {
    it('solo acepta claro y oscuro', () => {
        expect(esTema('claro')).toBe(true);
        expect(esTema('oscuro')).toBe(true);
        expect(esTema('auto')).toBe(false);
        expect(esTema(null)).toBe(false);
    });
});