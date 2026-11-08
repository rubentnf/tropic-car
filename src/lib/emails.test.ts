import { describe, expect, it } from 'vitest';
import tarifas from '../data/tarifas.json';
import { correoParaCliente, correoParaEmpresa } from './emails';
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
    for (const [k, v] of Object.entries({ ...valido, ...cambios })) if (v != null) f.set(k, v);
    return f;
}

describe('correos', () => {
    const r = validarSolicitud(datos(), data);
    if (!r.ok) throw new Error('solicitud de prueba no válida');
    const s = r.solicitud;

    it('el aviso a la empresa lleva los datos y permite responder al cliente', () => {
        const c = correoParaEmpresa(s, 'info@tropic.test');
        expect(c.to).toBe('info@tropic.test');
        expect(c.replyTo).toBe('ana@example.com');
        expect(c.text).toContain('+34 600 123 456');
        expect(c.text).toContain('FR1234');
        expect(c.text).toContain('250');
    });
    it('el acuse al cliente va en su idioma y dice que no está confirmada', () => {
        const frases = {
            es: 'en trámite',
            en: 'not a confirmed booking',
            de: 'noch keine bestätigte Buchung',
            fr: 'pas encore une réservation confirmée',
            it: 'ancora una prenotazione confermata',
        } as const;
        for (const [lang, frase] of Object.entries(frases)) {
            const r = validarSolicitud(datos({ lang }), data);
            if (!r.ok) throw new Error(`no válida: ${lang}`);
            expect(correoParaCliente(r.solicitud).text, lang).toContain(frase);
        }
    });
})