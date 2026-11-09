import tarifas from '../data/tarifas.json';
import type { Locale } from '../i18n/utils';
import { leerBusqueda } from '../lib/busqueda';
import { formatearEuros, formatearFechaHora } from '../lib/formato';
import { calcularDias, calcularPrecio } from '../lib/precios';
import type { Tarifas } from '../lib/tipos';

const data = tarifas as unknown as Tarifas;
const raiz = document.querySelector<HTMLElement>('[data-resultados]');

if (raiz) iniciar(raiz);

function iniciar(raiz: HTMLElement): void {
    const lang = raiz.dataset.lang as Locale;
    const textos = JSON.parse(raiz.dataset.textos ?? '{}') as Record<string, string>;
    const parametros = new URLSearchParams(location.search);
    const busqueda = leerBusqueda(parametros);

    const sinDatos = raiz.querySelector<HTMLElement>('[data-sin-datos]');
    const conDatos = raiz.querySelector<HTMLElement>('[data-con-datos]');
    if (!busqueda || !sinDatos || !conDatos) {
        if (sinDatos) sinDatos.hidden = false;
        return;
    }
    conDatos.hidden = false;

    // «Cambiar búsqueda» lleva los datos actuales para que el buscador se rellene solo.
    const cambiar = raiz.querySelector<HTMLAnchorElement>('[data-cambiar]');
    if (cambiar) cambiar.search = location.search;

    const dias = calcularDias(busqueda.recogida, busqueda.devolucion);
    const etiquetaDias = `${dias} ${dias === 1 ? textos.dayOne : textos.dayMany}`;
    const resumen = raiz.querySelector<HTMLElement>('[data-resumen]');
    if (resumen) {
        resumen.textContent =
            `${textos.pickup}: ${textos['place_' + busqueda.lugarRecogida]}, ${formatearFechaHora(busqueda.recogida, lang)} · ` +
            `${textos.return}: ${textos['place_' + busqueda.lugarDevolucion]}, ${formatearFechaHora(busqueda.devolucion, lang)} · ${etiquetaDias}`;
    }

    const selectorSillas = raiz.querySelector<HTMLSelectElement>('[data-sillas]');
    const precioSilla = data.meta.baby_seat_per_day_eur;

    function pintar(): void {
        const sillas = Number(selectorSillas?.value ?? 0);
        for (const tarjeta of raiz.querySelectorAll<HTMLElement>('[data-grupo]')) {
            const grupo = data.groups.find((g) => g.id === tarjeta.dataset.grupo);
            if (!grupo) continue;

            const aviso = tarjeta.querySelector<HTMLElement>('[data-aviso]')!;
            const bloque = tarjeta.querySelector<HTMLElement>('[data-precio]')!;
            const boton = tarjeta.querySelector<HTMLAnchorElement>('[data-solicitar]')!;
            const resultado = calcularPrecio(grupo, dias, sillas, precioSilla);

            aviso.hidden = resultado.ok;
            bloque.hidden = !resultado.ok;
            boton.hidden = !resultado.ok;

            if (!resultado.ok) {
                aviso.textContent =
                    resultado.motivo === 'minimo_dias'
                        ? textos.minDays.replace('{n}', String(resultado.minDias))
                        : textos.noRate;
                continue;
            }

            const p = resultado.presupuesto;
            tarjeta.querySelector('[data-precio-dia]')!.textContent = formatearEuros(p.precioDia, lang);
            tarjeta.querySelector('[data-precio-total]')!.textContent = formatearEuros(p.total, lang);

            const destino = new URLSearchParams(parametros);
            destino.set('grupo', grupo.id);
            destino.set('sillas', String(p.sillas));
            boton.href = `${raiz.dataset.solicitud}?${destino.toString()}`;
        }
    }

    selectorSillas?.addEventListener('change', pintar);
    pintar();
}