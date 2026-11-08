import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import tarifas from '../data/tarifas.json';
import { modelosConFoto } from '../data/fotos';

describe('fotos de los modelos', () => {
    it('todos los modelos de las tarifas tienen foto asignada', () => {
        const nombres = new Set(tarifas.groups.flatMap((g) => g.models.map((m) => m.name)));
        expect([...nombres].filter((n) => !modelosConFoto.includes(n))).toEqual([]);
    });
    it('cada foto asignada existe en src/assets/modelos', async () => {
        const { readFileSync } = await import('node:fs');
        const codigo = readFileSync(new URL('../data/fotos.ts', import.meta.url), 'utf8');
        const archivos = [...codigo.matchAll(/: '([a-z0-9]+)',$/gm)].map((m) => m[1]);
        expect(archivos.length).toBe(modelosConFoto.length);
        for (const a of archivos) expect(existsSync(new URL(`../assets/modelos/${a}.webp`, import.meta.url)), a).toBe(true);
    });
});