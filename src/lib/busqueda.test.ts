import { describe, expect, it } from 'vitest';
import { leerBusqueda } from './busqueda';

const base = {
    lugar_recogida: 'office',
    lugar_devolucion: '',
    fecha_recogida: '2026-11-01',
    hora_recogida: '10:00',
    fecha_devolucion: '2026-11-06',
    hora_devolucion: '10:00',
};

const con = (cambios: Record<string, string>) => new URLSearchParams({ ...base, ...cambios });

describe('leerBusqueda', () => {
    it('acepta una búsqueda válida', () => {
        const b = leerBusqueda(con({}));
        expect(b?.lugarRecogida).toBe('office');
        expect(b?.recogida.getDate()).toBe(1);
        expect(b?.devolucion.getDate()).toBe(6);
    });
    it('devolución vacía = mismo lugar que la recogida', () => {
        expect(leerBusqueda(con({ lugar_recogida: 'hotel' }))?.lugarDevolucion).toBe('hotel');
    });
    it('acepta un lugar de devolución distinto', () => {
        expect(leerBusqueda(con({ lugar_devolucion: 'airportSouth' }))?.lugarDevolucion).toBe('airportSouth');
    });
    it('acepta puerto y domicilio como lugares de recogida y devolución', () => {
        const b = leerBusqueda(con({ lugar_recogida: 'port', lugar_devolucion: 'address' }));
        expect(b?.lugarRecogida).toBe('port');
        expect(b?.lugarDevolucion).toBe('address');
    });
    it('rechaza parámetros que faltan', () => {
        expect(leerBusqueda(new URLSearchParams())).toBeNull();
        expect(leerBusqueda(con({ fecha_recogida: '' }))).toBeNull();
    });
    it('rechaza lugares desconocidos', () => {
        expect(leerBusqueda(con({ lugar_recogida: 'luna' }))).toBeNull();
        expect(leerBusqueda(con({ lugar_devolucion: 'luna' }))).toBeNull();
    });
    it('rechaza fechas que no existen', () => {
        expect(leerBusqueda(con({ fecha_devolucion: '2026-02-31' }))).toBeNull();
        expect(leerBusqueda(con({ hora_recogida: '25:00' }))).toBeNull();
    });
    it('rechaza devolución igual o anterior a la recogida', () => {
        expect(leerBusqueda(con({ fecha_devolucion: '2026-11-01' }))).toBeNull();
        expect(leerBusqueda(con({ fecha_devolucion: '2026-10-30' }))).toBeNull();
    });
});