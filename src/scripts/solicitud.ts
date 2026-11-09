import tarifas from '../data/tarifas.json';
import type { Locale } from '../i18n/utils';
import { leerBusqueda } from '../lib/busqueda';
import { formatearEuros, formatearFechaHora } from '../lib/formato';
import { calcularDias, calcularPrecio } from '../lib/precios';
import type { Tarifas } from '../lib/tipos';

const data = tarifas as unknown as Tarifas;
const raiz = document.querySelector<HTMLElement>('[data-solicitud]');
if (raiz) iniciar(raiz);

/** Campo del formulario al que se refiere cada código de error. Los demás códigos son generales. */
const CAMPO_DE_ERROR: Record<string, string> = {
    nombre: 'nombre',
    telefono: 'telefono',
    email: 'email',
    edad: 'edad',
    carnet: 'anos_carnet',
    privacidad: 'privacidad',
};
/** Si la red se cuelga, el botón no se queda en «Enviando…» para siempre. */
const TIEMPO_MAXIMO_MS = 30_000;

function iniciar(raiz: HTMLElement): void {
    const lang = raiz.dataset.lang as Locale;
    const textos = JSON.parse(raiz.dataset.textos ?? '{}') as Record<string, string>;
    const errores = JSON.parse(raiz.dataset.errores ?? '{}') as Record<string, string>;
    const params = new URLSearchParams(location.search);

    const sinDatos = raiz.querySelector<HTMLElement>('[data-sin-datos]')!;
    const conDatos = raiz.querySelector<HTMLElement>('[data-con-datos]')!;
    const busqueda = leerBusqueda(params);
    const grupo = data.groups.find((g) => g.id === params.get('grupo'));
    const dias = busqueda ? calcularDias(busqueda.recogida, busqueda.devolucion) : 0;
    const sillas = Number(params.get('sillas') ?? 0);
    const precio = grupo ? calcularPrecio(grupo, dias, sillas, data.meta.baby_seat_per_day_eur) : null;

    if (!busqueda || !grupo || !precio?.ok) {
        sinDatos.hidden = false;
        return;
    }
    conDatos.hidden = false;

    const p = precio.presupuesto;
    const filas: [string, string][] = [
        [textos.group, `${grupo.id} · ${grupo.models.map((m) => m.name).join(', ')}`],
        [textos.pickup, `${textos['place_' + busqueda.lugarRecogida]}, ${formatearFechaHora(busqueda.recogida, lang)}`],
        [textos.return, `${textos['place_' + busqueda.lugarDevolucion]}, ${formatearFechaHora(busqueda.devolucion, lang)}`],
        [textos.days, String(p.dias)],
        [textos.seats, String(p.sillas)],
        [textos.total, formatearEuros(p.total, lang)],
    ];
    const lista = raiz.querySelector<HTMLElement>('[data-resumen]')!;
    for (const [clave, valor] of filas) {
        const dt = document.createElement('dt');
        dt.textContent = clave;
        const dd = document.createElement('dd');
        dd.textContent = valor;
        lista.append(dt, dd);
    }

    const form = raiz.querySelector<HTMLFormElement>('form')!;
    const campos = ['lugar_recogida', 'lugar_devolucion', 'fecha_recogida', 'hora_recogida', 'fecha_devolucion', 'hora_devolucion', 'grupo', 'sillas'];
    for (const campo of campos) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = campo;
        input.value = params.get(campo) ?? '';
        form.append(input);
    }

    const mensaje = raiz.querySelector<HTMLElement>('[data-mensaje]')!;
    const boton = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
    const textoBoton = boton.textContent;
    const campo = (nombre: string) => form.elements.namedItem(nombre) as HTMLInputElement;

    function limpiarError(input: HTMLInputElement): void {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
        document.getElementById(`error-${input.name}`)?.remove();
    }

    function marcarError(input: HTMLInputElement, texto: string): void {
        limpiarError(input);
        const aviso = document.createElement('p');
        aviso.id = `error-${input.name}`;
        aviso.className = 'error';
        aviso.textContent = texto;
        (input.closest('.casilla') ?? input).after(aviso);
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', aviso.id);
    }

    /** Cada error va junto a su campo; el foco salta al primero. Lo que no es de un campo, al mensaje general. */
    function pintarErrores(codigos: string[]): void {
        const generales: string[] = [];
        let primero: HTMLInputElement | undefined;
        for (const codigo of codigos) {
            const nombre = CAMPO_DE_ERROR[codigo];
            if (nombre) {
                const input = campo(nombre);
                marcarError(input, errores[codigo]);
                primero ??= input;
            } else if (errores[codigo]) {
                generales.push(errores[codigo]);
            }
        }
        mensaje.textContent = generales.join(' ') || (primero ? '' : errores.generic);
        primero?.focus();
    }

    form.addEventListener('input', (e) => {
        if (e.target instanceof HTMLInputElement) limpiarError(e.target);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        mensaje.textContent = '';
        for (const nombre of Object.values(CAMPO_DE_ERROR)) limpiarError(campo(nombre));

        const invalidos = Object.keys(CAMPO_DE_ERROR).filter((c) => !campo(CAMPO_DE_ERROR[c]).checkValidity());
        if (invalidos.length > 0) {
            pintarErrores(invalidos);
            return;
        }
        boton.disabled = true;
        boton.textContent = textos.sending;
        try {
            const respuesta = await fetch('/api/solicitud', {
                method: 'POST',
                body: new FormData(form),
                signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS),
            });
            const cuerpo = (await respuesta.json()) as { ok: boolean; errores?: string[] };
            if (cuerpo.ok) {
                location.href = raiz.dataset.gracias ?? '/';
                return;
            }
            pintarErrores(cuerpo.errores ?? []);
        } catch {
            mensaje.textContent = errores.generic;
        }
        boton.disabled = false;
        boton.textContent = textoBoton;
        // Al desactivarse, el botón pierde el foco: se le devuelve si no lo ha tomado un campo con error.
        if (document.activeElement === document.body) boton.focus();
    });
}