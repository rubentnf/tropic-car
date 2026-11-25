import { describe, expect, it } from "vitest";
import tarifas from "../data/tarifas.json";
import {
  categoriaGrupo,
  categorias,
  cumpleFiltros,
  ordenarFilas,
  plazasGrupo,
  type Filtros,
} from "./filtros";
import type { Tarifas } from "./tipos";

const grupos = (tarifas as unknown as Tarifas).groups;
const grupo = (id: string) => grupos.find((g) => g.id === id)!;
const todo: Filtros = {
  cambios: new Set(["manual", "automatic"]),
  categorias: new Set(categorias),
  plazasMin: 0,
};

describe("categoriaGrupo", () => {
  it("clasifica los 14 grupos del flyer", () => {
    expect(grupos.map((g) => categoriaGrupo(g)).filter(Boolean)).toHaveLength(
      14,
    );
    expect(categoriaGrupo(grupo("F"))).toBe("suv");
    expect(categoriaGrupo(grupo("H"))).toBe("descapotable");
    expect(categoriaGrupo(grupo("K"))).toBe("furgoneta");
  });
});

describe("plazasGrupo", () => {
  it("usa el dato cuando todos los modelos lo traen", () => {
    expect(plazasGrupo(grupo("J"))).toBe(7);
    expect(plazasGrupo(grupo("K"))).toBe(9);
  });
  it("asume 5 si algún modelo no lo trae (el «2-3» del Fiat 500 no cuenta)", () => {
    expect(plazasGrupo(grupo("A"))).toBe(5);
    expect(plazasGrupo(grupo("B"))).toBe(5);
  });
});

describe("cumpleFiltros", () => {
  it("sin filtros activos entran todos", () => {
    expect(grupos.every((g) => cumpleFiltros(g, todo))).toBe(true);
  });
  it("solo automático deja fuera los manuales y mantiene los «manual o automático»", () => {
    const f = { ...todo, cambios: new Set(["automatic" as const]) };
    expect(cumpleFiltros(grupo("B"), f)).toBe(false);
    expect(cumpleFiltros(grupo("F"), f)).toBe(true);
    expect(cumpleFiltros(grupo("J"), f)).toBe(true);
  });
  it("filtra por tipo", () => {
    const f = { ...todo, categorias: new Set(["descapotable" as const]) };
    expect(grupos.filter((g) => cumpleFiltros(g, f)).map((g) => g.id)).toEqual([
      "G",
      "H",
      "I",
    ]);
  });
  it("filtra por plazas mínimas", () => {
    const f = { ...todo, plazasMin: 7 };
    expect(grupos.filter((g) => cumpleFiltros(g, f)).map((g) => g.id)).toEqual([
      "J",
      "K",
      "L",
    ]);
  });
  it("con todos los cambios desmarcados no queda nada", () => {
    expect(
      grupos.some((g) => cumpleFiltros(g, { ...todo, cambios: new Set() })),
    ).toBe(false);
  });
});

describe("ordenarFilas", () => {
  const filas = [
    { id: "A", plazas: 5, total: 200 },
    { id: "I", plazas: 4, total: null },
    { id: "F", plazas: 5, total: 390 },
    { id: "K", plazas: 9, total: 575 },
  ];
  it("de menor a mayor precio, con los no disponibles al final", () => {
    expect(ordenarFilas(filas, "precio-asc").map((f) => f.id)).toEqual([
      "A",
      "F",
      "K",
      "I",
    ]);
  });
  it("de mayor a menor precio, con los no disponibles al final", () => {
    expect(ordenarFilas(filas, "precio-desc").map((f) => f.id)).toEqual([
      "K",
      "F",
      "A",
      "I",
    ]);
  });
  it("por plazas, y a igualdad, el más barato primero", () => {
    expect(ordenarFilas(filas, "plazas").map((f) => f.id)).toEqual([
      "K",
      "A",
      "F",
      "I",
    ]);
  });
  it("no modifica la lista original", () => {
    const copia = filas.map((f) => f.id);
    ordenarFilas(filas, "precio-desc");
    expect(filas.map((f) => f.id)).toEqual(copia);
  });
});
