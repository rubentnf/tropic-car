import tarifas from '../data/tarifas.json';
import type { Locale } from '../i18n/utils';
import { leerBusqueda } from '../lib/busqueda';
import { formatearEuros, formatearFechaHora } from '../lib/formato';
import { calcularDias, calcularPrecio } from '../lib/precios';
import type { Tarifas } from '../lib/tipos';

const data = tarifas as unknown as Tarifas;
const raiz = document.querySelector<HTMLElement>('[data-solicitud]');
if (raiz) iniciar(raiz);

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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        mensaje.textContent = '';
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        boton.disabled = true;
        boton.textContent = textos.sending;
        try {
            const respuesta = await fetch('/api/solicitud', { method: 'POST', body: new FormData(form) });
            const cuerpo = (await respuesta.json()) as { ok: boolean; errores?: string[] };
            if (cuerpo.ok) {
                location.href = raiz.dataset.gracias ?? '/';
                return;
            }
            const lista = (cuerpo.errores ?? []).map((c) => errores[c]).filter(Boolean);
            mensaje.textContent = lista.length ? lista.join(' ') : errores.generic;
        } catch {
            mensaje.textContent = errores.generic;
        }
        boton.disabled = false;
        boton.textContent = textoBoton;
    });
}