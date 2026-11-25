import tarifas from "../data/tarifas.json";
import type { Locale } from "../i18n/utils";
import { leerBusqueda } from "../lib/busqueda";
import {
  categorias,
  cumpleFiltros,
  ordenarFilas,
  plazasGrupo,
  type Cambio,
  type Categoria,
  type Filtros,
  type Orden,
} from "../lib/filtros";
import { formatearEuros, formatearFechaHora } from "../lib/formato";
import { calcularDias, calcularPrecio } from "../lib/precios";
import type { Tarifas } from "../lib/tipos";

const data = tarifas as unknown as Tarifas;
const raiz = document.querySelector<HTMLElement>("[data-resultados]");

if (raiz) iniciar(raiz);

function iniciar(raiz: HTMLElement): void {
  const lang = raiz.dataset.lang as Locale;
  const textos = JSON.parse(raiz.dataset.textos ?? "{}") as Record<
    string,
    string
  >;
  const parametros = new URLSearchParams(location.search);
  const busqueda = leerBusqueda(parametros);

  const sinDatos = raiz.querySelector<HTMLElement>("[data-sin-datos]");
  const conDatos = raiz.querySelector<HTMLElement>("[data-con-datos]");
  if (!busqueda || !sinDatos || !conDatos) {
    if (sinDatos) sinDatos.hidden = false;
    return;
  }
  conDatos.hidden = false;

  const dias = calcularDias(busqueda.recogida, busqueda.devolucion);
  const etiquetaDias = `${dias} ${dias === 1 ? textos.dayOne : textos.dayMany}`;
  const resumen = raiz.querySelector<HTMLElement>("[data-resumen]");
  if (resumen) {
    resumen.textContent =
      `${textos.pickup}: ${textos["place_" + busqueda.lugarRecogida]}, ${formatearFechaHora(busqueda.recogida, lang)} · ` +
      `${textos.return}: ${textos["place_" + busqueda.lugarDevolucion]}, ${formatearFechaHora(busqueda.devolucion, lang)} · ${etiquetaDias}`;
  }

  const selectorSillas = raiz.querySelector<HTMLSelectElement>("[data-sillas]");
  const selectorOrden = raiz.querySelector<HTMLSelectElement>("[data-orden]")!;
  const lista = raiz.querySelector<HTMLElement>("[data-lista]")!;
  const cuenta = raiz.querySelector<HTMLElement>("[data-cuenta]")!;
  const sinCoincidencias = raiz.querySelector<HTMLElement>(
    "[data-sin-coincidencias]",
  )!;
  const precioSilla = data.meta.baby_seat_per_day_eur;

  function leerFiltros(): Filtros {
    const marcados = (filtro: string) =>
      [
        ...raiz.querySelectorAll<HTMLInputElement>(
          `[data-filtro="${filtro}"] input:checked`,
        ),
      ].map((i) => i.value);
    const plazas = raiz.querySelector<HTMLInputElement>(
      '[data-filtro="plazas"] input:checked',
    );
    return {
      cambios: new Set(marcados("cambio") as Cambio[]),
      categorias: new Set(
        marcados("categoria").filter((c): c is Categoria =>
          (categorias as readonly string[]).includes(c),
        ),
      ),
      plazasMin: Number(plazas?.value ?? 0),
    };
  }

  function pintar(): void {
    const sillas = Number(selectorSillas?.value ?? 0);
    const filtros = leerFiltros();
    const filas: { id: string; plazas: number; total: number | null }[] = [];

    for (const tarjeta of raiz.querySelectorAll<HTMLElement>("[data-grupo]")) {
      const grupo = data.groups.find((g) => g.id === tarjeta.dataset.grupo);
      if (!grupo) continue;

      const aviso = tarjeta.querySelector<HTMLElement>("[data-aviso]")!;
      const bloque = tarjeta.querySelector<HTMLElement>("[data-precio]")!;
      const boton =
        tarjeta.querySelector<HTMLAnchorElement>("[data-solicitar]")!;
      const resultado = calcularPrecio(grupo, dias, sillas, precioSilla);

      aviso.hidden = resultado.ok;
      bloque.hidden = !resultado.ok;
      boton.hidden = !resultado.ok;

      // Resalta el tramo de precio que se aplica a estas fechas.
      for (const tramo of tarjeta.querySelectorAll<HTMLElement>(
        "[data-tramo]",
      )) {
        if (resultado.ok && tramo.dataset.tramo === resultado.presupuesto.tramo)
          tramo.setAttribute("aria-current", "true");
        else tramo.removeAttribute("aria-current");
      }

      tarjeta.hidden = !cumpleFiltros(grupo, filtros);
      filas.push({
        id: grupo.id,
        plazas: plazasGrupo(grupo),
        total: resultado.ok ? resultado.presupuesto.total : null,
      });

      if (!resultado.ok) {
        aviso.textContent =
          resultado.motivo === "minimo_dias"
            ? textos.minDays.replace("{n}", String(resultado.minDias))
            : textos.noRate;
        continue;
      }

      const p = resultado.presupuesto;
      tarjeta.querySelector("[data-precio-dia]")!.textContent = formatearEuros(
        p.precioDia,
        lang,
      );
      tarjeta.querySelector("[data-precio-total]")!.textContent =
        formatearEuros(p.total, lang);

      const destino = new URLSearchParams(parametros);
      destino.set("grupo", grupo.id);
      destino.set("sillas", String(p.sillas));
      boton.href = `${raiz.dataset.solicitud}?${destino.toString()}`;
    }

    // Reordena moviendo los nodos que ya existen (así no pierden su galería ni su estado).
    for (const fila of ordenarFilas(filas, selectorOrden.value as Orden)) {
      const tarjeta = lista.querySelector<HTMLElement>(
        `[data-grupo="${fila.id}"]`,
      );
      if (tarjeta) lista.append(tarjeta);
    }

    const visibles = lista.querySelectorAll(
      "[data-grupo]:not([hidden])",
    ).length;
    cuenta.textContent = textos.showing
      .replace("{n}", String(visibles))
      .replace("{total}", String(data.groups.length));
    sinCoincidencias.hidden = visibles > 0;
  }

  selectorSillas?.addEventListener("change", pintar);
  selectorOrden.addEventListener("change", pintar);
  for (const control of raiz.querySelectorAll<HTMLInputElement>(
    "[data-filtro] input",
  ))
    control.addEventListener("change", pintar);
  pintar();
}
