/** Páginas legales: la ruta (slug) y la clave de su contenido en src/i18n/contenido. */
export const PAGINAS = ['aviso-legal', 'privacidad', 'cookies'] as const;
export type Pagina = (typeof PAGINAS)[number];

export const CLAVES = { 'aviso-legal': 'avisoLegal', privacidad: 'privacidad', cookies: 'cookies' } as const;