import { empresa } from "../data/empresa";

const esPendiente = (valor: string) => valor.includes('PENDIENTE');

/**
 * Datos estructurados de la empresa para buscadores (schema.org).
 * Solo incluye los campos que ya tienen un valor real: nunca publica un "[... PENDIENTE]".
 */
export function datosEstructurados(url: string): Record<string, unknown> {
    const datos: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'AutoRental',
        name: empresa.nombreComercial,
        legalName: empresa.razonSocial,
        url,
        areaServed: 'Tenerife',
    };
    if (!esPendiente(empresa.telefono)) datos.telephone = empresa.telefono;
    if (!esPendiente(empresa.email)) datos.email = empresa.email;
    if (!esPendiente(empresa.domicilio)) datos.address = { '@type': 'PostalAddress', streetAddress: empresa.domicilio, addressCountry: 'ES' };
    return datos;
}