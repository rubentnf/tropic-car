import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

/**
 * El panel de edición (public/admin/config.yml) solo conserva los campos que declara.
 * Estos tests comprueban que declara TODOS los que tienen los JSON, para que guardar desde el panel
 * no pueda borrar nada.
 */
interface Campo {
    name: string;
    widget?: string;
    fields?: Campo[];
    field?: Campo;
    options?: { value: string }[];
}
interface Config {
    collections: { files: { file: string; fields: Campo[] }[] }[];
}

const config = parse(readFileSync(new URL('../../public/admin/config.yml', import.meta.url), 'utf8')) as Config;
const archivos = config.collections.flatMap((c) => c.files);

function leerJson(ruta: string): unknown {
    return JSON.parse(readFileSync(new URL(`../../${ruta}`, import.meta.url), 'utf8'));
}

/** Devuelve las rutas de los datos que ningún campo del panel declara. */
function sinDeclarar(valor: unknown, campos: Campo[], ruta: string): string[] {
    if (Array.isArray(valor)) return valor.flatMap((v, i) => sinDeclarar(v, campos, `${ruta}[${i}]`));
    if (valor === null || typeof valor !== 'object') return [];
    return Object.entries(valor).flatMap(([clave, v]) => {
        const campo = campos.find((c) => c.name === clave);
        if (!campo) return [`${ruta}.${clave}`];
        if (campo.fields) return sinDeclarar(v, campo.fields, `${ruta}.${clave}`);
        return [];
    });
}

describe('panel de edición', () => {
    it('declara todos los campos de los archivos de datos', () => {
        for (const a of archivos) {
            expect(sinDeclarar(leerJson(a.file), a.fields, a.file), a.file).toEqual([]);
        }
    });
    it('los cambios de cada grupo están entre las opciones del panel', () => {
        const tarifas = leerJson('src/data/tarifas.json') as { groups: { gearbox: string }[] };
        const grupos = archivos.find((a) => a.file === 'src/data/tarifas.json')!.fields.find((c) => c.name === 'groups')!;
        const opciones = grupos.fields!.find((c) => c.name === 'gearbox')!.options!.map((o) => o.value);
        for (const g of tarifas.groups) expect(opciones).toContain(g.gearbox);
    });
    it('apunta a un repositorio y una rama', () => {
        const c = config as unknown as { backend: { name: string; repo: string; branch: string } };
        expect(c.backend.name).toBe('github');
        expect(c.backend.repo).toMatch(/^[^/\s]+\/[^/\s]+$/);
        expect(c.backend.branch).toBeTruthy();
    });
});