import type { ImageMetadata } from "astro";

/**
 * Foto de cada modelo. La clave es el nombre tal como sale en tarifas.json;
 * el valor, el nombre del archivo (sin .webp) dentro de src/assets/modelos/.
 */
const ARCHIVOS: Record<string, string> = {
    'Fiat 500': '500',
    'Fiat Panda': 'panda',
    'Hyundai i10': 'i10',
    'Renault Clio': 'clio',
    'Peugeot 208': '208',
    'Nissan Micra': 'micra',
    'Opel Corsa': 'corsa',
    'VW Polo': 'polo',
    'VW T-Cross': 'tcross',
    'Citroen C3': 'c3',
    'Kia Stonic': 'stonic',
    'Nissan Juke': 'juke',
    'VW Golf': 'golf',
    'Peugeot 2008': '2008',
    'Suzuki Vitara': 'vitara',
    'Nissan Townstar': 'townstar',
    'Renault Kangoo': 'kangoo',
    'Skoda Fabia': 'fabia',
    'Toyota Yaris': 'yaris',
    'VW Taigo': 'taigo',
    'Skoda Kamiq': 'kamiq',
    'Nissan Qashqai': 'qashqai',
    'Nissan X-Trail': 'xtrail',
    'Fiat 500 Cabrio': '500c',
    'VW T-Roc Cabrio': 'troc',
    'Audi A5 Cabrio': 'a5',
    'VW Caddy': 'caddy',
    'VW Transporter': 'transporter',
    'Renault Traffic': 'traffic',
    'Nissan Nv300': 'nv300',
    'Mercedes Vito': 'vito',
};

const imagenes = import.meta.glob<{ default: ImageMetadata }>('../assets/modelos/*.webp', { eager: true });

export function fotoModelo(nombre: string): ImageMetadata | undefined {
    const archivo = ARCHIVOS[nombre];
    return archivo ? imagenes[`../assets/modelos/${archivo}.webp`]?.default : undefined;
}

export const modelosConFoto = Object.keys(ARCHIVOS);