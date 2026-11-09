import type { Locale } from '../i18n/utils';
import datos from './empresa.json';

export interface Empresa {
    razonSocial: string;
    nombreComercial: string;
    cif: string;
    domicilio: string;
    registroMercantil: string;
    email: string;
    telefono: string;
    horario: Record<Locale, string>;
    /** Enlace a Google Maps: funciona sin claves ni cookies hasta que el usuario lo abre. */
    mapaEnlace: string;
    /** URL para incrustar el mapa (opcional). Vacío = no se muestra el mapa incrustado. */
    mapaEmbedUrl: string;
}

/**
 * Datos de la empresa. Viven en empresa.json (se pueden editar desde el panel /admin/).
 * Todo lo que pone PENDIENTE hay que pedírselo a Eduardo: se usa en el pie, en contacto y en los textos legales.
 */
export const empresa: Empresa = datos;