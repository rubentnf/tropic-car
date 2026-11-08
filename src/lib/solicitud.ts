import { leerBusqueda, type Busqueda } from "./busqueda";
import { calcularDias, calcularPrecio, type Presupuesto } from "./precios";
import type { Grupo, Tarifas } from "./tipos";
import { isLocale, type Locale } from "../i18n/utils";

export type CodigoError =
    | 'nombre'
    | 'telefono'
    | 'email'
    | 'edad'
    | 'carnet'
    | 'privacidad'
    | 'busqueda'
    | 'grupo'
    | 'precio'
    | 'idioma';

export interface Solicitud {
    lang: Locale;
    nombre: string;
    telefono: string;
    email: string;
    edad: number;
    anosCarnet: number;
    vuelo: string;
    comentarios: string;
    busqueda: Busqueda;
    grupo: Grupo;
    presupuesto: Presupuesto;
}

export type ResultadoValidacion = { ok: true; solicitud: Solicitud } | { ok: false; errores: CodigoError[] };

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RE_TELEFONO = /^\+?[0-9 ()-]{7,20}$/;

function texto(datos: FormData, clave: string, max: number): string {
    const v = datos.get(clave);
    return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

/**
 * Valida los datos del formulario y RECALCULA el precio con las tarifas.
 * El precio que vea el navegador no se usa nunca: lo único que se acepta son los datos de la búsqueda.
 */
export function validarSolicitud(datos: FormData, tarifas: Tarifas): ResultadoValidacion {
    const errores: CodigoError[] = [];
    const req = tarifas.meta.driver_requirements;

    const lang = texto(datos, 'lang', 5);
    if (!isLocale(lang)) errores.push('idioma');

    const nombre = texto(datos, 'nombre', 100);
    if (nombre.length < 2) errores.push('nombre');

    const telefono = texto(datos, 'telefono', 30);
    if (!RE_TELEFONO.test(telefono)) errores.push('telefono');

    const email = texto(datos, 'email', 150);
    if (!RE_EMAIL.test(email)) errores.push('email');

    const edad = Number(texto(datos, 'edad', 3));
    if (!Number.isInteger(edad) || edad < req.min_age || edad > req.max_age) errores.push('edad');

    const anosCarnet = Number(texto(datos, 'anos_carnet', 3));
    if (!Number.isInteger(anosCarnet) || anosCarnet < req.min_license_years) errores.push('carnet');

    if (datos.get('privacidad') !== 'on') errores.push('privacidad');

    const params = new URLSearchParams();
    for (const k of ['lugar_recogida', 'lugar_devolucion', 'fecha_recogida', 'hora_recogida', 'fecha_devolucion', 'hora_devolucion']) {
        params.set(k, texto(datos, k, 20));
    }
    const busqueda = leerBusqueda(params);
    if (!busqueda) errores.push('busqueda');

    const grupo = tarifas.groups.find((g) => g.id === texto(datos, 'grupo', 5));
    if (!grupo) errores.push('grupo');

    const sillas = Number(texto(datos, 'sillas', 2));

    if (errores.length > 0 || !busqueda || !grupo) return { ok: false, errores };

    const dias = calcularDias(busqueda.recogida, busqueda.devolucion);
    const precio = calcularPrecio(grupo, dias, Number.isInteger(sillas) ? Math.min(Math.max(sillas, 0), 3) : 0, tarifas.meta.baby_seat_per_day_eur);
    if (!precio.ok) return { ok: false, errores: ['precio'] };

    return {
        ok: true,
        solicitud: {
            lang: lang as Locale,
            nombre,
            telefono,
            email,
            edad,
            anosCarnet,
            vuelo: texto(datos, 'vuelo', 30),
            comentarios: texto(datos, 'comentarios', 1000),
            busqueda,
            grupo,
            presupuesto: precio.presupuesto,
        },
    };
}