export const LUGARES = ['office', 'airportSouth', 'airportNorth', 'port', 'hotel', 'address'] as const;
export type Lugar = (typeof LUGARES)[number];

export interface Busqueda {
    lugarRecogida: Lugar;
    lugarDevolucion: Lugar;
    recogida: Date;
    devolucion: Date;
}

const RE_FECHA = /^(\d{4})-(\d{2})-(\d{2})$/;
const RE_HORA = /^(\d{2}):(\d{2})$/;

function esLugar(valor: string | null): valor is Lugar {
    return !!valor && (LUGARES as readonly string[]).includes(valor);
}

/** Construye una fecha local y la rechaza si el calendario la "corrige" (p. ej. 31 de febrero). */
function leerFecha(fecha: string | null, hora: string | null): Date | null {
    const f = RE_FECHA.exec(fecha ?? '');
    const h = RE_HORA.exec(hora ?? '');
    if (!f || !h) return null;
    const [a, m, d, hh, mm] = [f[1], f[2], f[3], h[1], h[2]].map(Number) as [number, number, number, number, number];
    const date = new Date(a, m - 1, d, hh, mm);
    const coincide =
        date.getFullYear() === a && date.getMonth() === m - 1 && date.getDate() === d && date.getHours() === hh && date.getMinutes() === mm;
    return coincide ? date : null;
}

/** Interpreta los parámetros que envía el buscador. Devuelve null si algo no es válido. */
export function leerBusqueda(params: URLSearchParams): Busqueda | null {
    const lugarRecogida = params.get('lugar_recogida');
    if (!esLugar(lugarRecogida)) return null;

    const devolucionRaw = params.get('lugar_devolucion');
    if (devolucionRaw && !esLugar(devolucionRaw)) return null;
    const lugarDevolucion: Lugar = devolucionRaw && esLugar(devolucionRaw) ? devolucionRaw : lugarRecogida;

    const recogida = leerFecha(params.get('fecha_recogida'), params.get('hora_recogida'));
    const devolucion = leerFecha(params.get('fecha_devolucion'), params.get('hora_devolucion'));
    if (!recogida || !devolucion || devolucion.getTime() <= recogida.getTime()) return null;

    return { lugarRecogida, lugarDevolucion, recogida, devolucion };
}