import { describe, expect, it } from "vitest";
import { datosEstructurados } from "./seo";

describe('datosEstructurados', () => {
    it('incluye el tipo y el nombre', () => {
        const d = datosEstructurados('https://ejemplo.test/es/');
        expect(d['@type']).toBe('AutoRental');
        expect(d.name).toBe('Tropic Rent a Car');
        expect(d.url).toBe('https://ejemplo.test/es/');
    });
    it('no publica nunca datos pendientes', () => {
        expect(JSON.stringify(datosEstructurados('https://ejemplo.test/'))).not.toContain('PENDIENTE');
    });
});