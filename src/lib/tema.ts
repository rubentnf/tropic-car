export type Tema = 'claro' | 'oscuro';

export function esTema(valor: unknown): valor is Tema {
    return valor === 'claro' || valor === 'oscuro';
}

/**
 * Tema con el que se abre la web: el que la persona eligió (si lo hay) y, si no, el del dispositivo.
 * El script de <head> de Base.astro hace lo mismo antes de pintar; si cambias una, cambia la otra.
 */
export function temaInicial(guardado: string | null, sistemaOscuro: boolean): Tema {
    if (esTema(guardado)) return guardado;
    return sistemaOscuro ? 'oscuro' : 'claro';
}

export function alternarTema(actual: string | undefined): Tema {
    return actual === 'oscuro' ? 'claro' : 'oscuro';
}
