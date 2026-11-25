import type { Grupo } from "./tipos";

export const categorias = [
  "utilitario",
  "suv",
  "descapotable",
  "furgoneta",
] as const;
export type Categoria = (typeof categorias)[number];
export type Cambio = "manual" | "automatic";
export type Orden = "precio-asc" | "precio-desc" | "plazas";

const CATEGORIA_POR_GRUPO: Record<string, Categoria> = {
  A: "utilitario",
  B: "utilitario",
  C: "utilitario",
  E: "utilitario",
  D: "suv",
  "E.1": "suv",
  F: "suv",
  G: "descapotable",
  H: "descapotable",
  I: "descapotable",
  "D.1": "furgoneta",
  J: "furgoneta",
  K: "furgoneta",
  L: "furgoneta",
};

export function categoriaGrupo(grupo: Grupo): Categoria {
  return CATEGORIA_POR_GRUPO[grupo.id] ?? "utilitario";
}

export function plazasGrupo(grupo: Grupo): number {
  const numeros = grupo.models.map((m) =>
    Math.max(0, ...(String(m.pax ?? "").match(/\d+/g) ?? []).map(Number)),
  );
  if (numeros.length === 0 || numeros.some((n) => n === 0)) return 5;
  return Math.min(...numeros);
}

export interface Filtros {
  cambios: ReadonlySet<Cambio>;
  categorias: ReadonlySet<Categoria>;
  plazasMin: number;
}

export function cumpleFiltros(grupo: Grupo, filtros: Filtros): boolean {
  const cambioOk =
    grupo.gearbox === "manual_or_automatic"
      ? filtros.cambios.has("manual") || filtros.cambios.has("automatic")
      : filtros.cambios.has(
          grupo.gearbox === "manual" ? "manual" : "automatic",
        );
  return (
    cambioOk &&
    filtros.categorias.has(categoriaGrupo(grupo)) &&
    plazasGrupo(grupo) >= filtros.plazasMin
  );
}

export interface Fila {
  id: string;
  plazas: number;
  /** Total para esas fechas; null si el grupo no está disponible (mínimo de días o sin tarifa). */
  total: number | null;
}

/** Ordena sin tocar la lista original. Los grupos sin precio van siempre al final. */
export function ordenarFilas(filas: readonly Fila[], orden: Orden): Fila[] {
  const copia = [...filas];
  const conPrecio = (
    a: Fila,
    b: Fila,
    f: (x: number, y: number) => number,
  ): number =>
    a.total === null && b.total === null
      ? 0
      : a.total === null
        ? 1
        : b.total === null
          ? -1
          : f(a.total, b.total);
  return copia.sort((a, b) => {
    if (orden === "precio-asc")
      return conPrecio(a, b, (x, y) => x - y) || a.id.localeCompare(b.id);
    if (orden === "precio-desc")
      return conPrecio(a, b, (x, y) => y - x) || a.id.localeCompare(b.id);
    return (
      b.plazas - a.plazas ||
      conPrecio(a, b, (x, y) => x - y) ||
      a.id.localeCompare(b.id)
    );
  });
}
