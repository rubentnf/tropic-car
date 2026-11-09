import { describe, expect, it } from 'vitest';
import tarifas from '../data/tarifas.json';
import { validarSolicitud } from './solicitud';
import type { Tarifas } from './tipos';

const data = tarifas as unknown as Tarifas;

const valido: Record<string, string> = {
    lang: 'es',
    nombre: 'Ana Pérez',
    telefono: '+34 600 123 456',
    email: 'ana@example.com',
    edad: '35',
    anos_carnet: '10',
    vuelo: 'FR1234',
    comentarios: 'Llegamos tarde',
    privacidad: 'on',
    lugar_recogida: 'airportSouth',
    lugar_devolucion: '',
    fecha_recogida: '2026-11-01',
    hora_recogida: '10:00',
    fecha_devolucion: '2026-11-06',
    hora_devolucion: '10:00',
    grupo: 'B',
    sillas: '1',
};

function datos(cambios: Record<string, string | null> = {}): FormData {
    const f = new FormData();
    for (const [k, v] of Object.entries({ ...valido, ...cambios })) if (v !== null) f.set(k, v);
    return f;
}

describe('validarSolicitud', () => {
    it('acepta una solicitud válida y recalcula el precio', () => {
        const r = validarSolicitud(datos(), data);
        expect(r.ok).toBe(true);
        if (r.ok) expect(r.solicitud.presupuesto.total).toBe(250); // 5 días x 45 € + 1 silla x 5 € x 5 días
    });
    it('guarda la dirección de entrega si se indica y la recorta a 200 caracteres', () => {
        const r = validarSolicitud(datos({ lugar_recogida: 'address', direccion: 'Calle Mar 5, Costa del Silencio' }), data);
        expect(r.ok && r.solicitud.direccion).toBe('Calle Mar 5, Costa del Silencio');
        const larga = validarSolicitud(datos({ direccion: 'x'.repeat(500) }), data);
        expect(larga.ok && larga.solicitud.direccion.length).toBe(200);
    });
    it('la dirección es opcional', () => {
        const r = validarSolicitud(datos(), data);
        expect(r.ok && r.solicitud.direccion).toBe('');
    });
    it('ignora cualquier precio que mande el navegador', () => {
        const r = validarSolicitud(datos({ total: '1', precio: '1' }), data);
        expect(r.ok && r.solicitud.presupuesto.total).toBe(250);
    });
    it.each([
        ['nombre', { nombre: 'A' }],
        ['telefono', { telefono: 'abc' }],
        ['email', { email: 'no-es-un-email' }],
        ['edad', { edad: '24' }],
        ['edad', { edad: '76' }],
        ['carnet', { anos_carnet: '4' }],
        ['privacidad', { privacidad: null }],
        ['busqueda', { fecha_devolucion: '2026-10-30' }],
        ['grupo', { grupo: 'Z' }],
        ['idioma', { lang: 'ru' }],
    ] as const)('rechaza %s no válido', (codigo, cambios) => {
        const r = validarSolicitud(datos(cambios), data);
        expect(r.ok).toBe(false);
        if (!r.ok) expect(r.errores).toContain(codigo);
    });
    it('rechaza el grupo I para 1 día', () => {
        const r = validarSolicitud(datos({ grupo: 'I', fecha_devolucion: '2026-11-02' }), data);
        expect(r).toEqual({ ok: false, errores: ['precio'] });
    });
});