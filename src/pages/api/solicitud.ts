import type { APIRoute } from "astro";
import { EMAIL_DESTINO, EMAIL_ORIGEN, RESEND_API_KEY } from "astro:env/server";
import { Resend } from 'resend';
import tarifas from '../../data/tarifas.json';
import { correoParaCliente, correoParaEmpresa, type Correo } from "../../lib/emails";
import { validarSolicitud } from "../../lib/solicitud";
import type { Tarifas } from '../../lib/tipos';

export const prerender = false;

const json = (cuerpo: unknown, status = 200) =>
    new Response(JSON.stringify(cuerpo), { status, headers: { 'Content-Type': 'application/json' } });

async function enviar(correo: Correo): Promise<boolean> {
    if (!RESEND_API_KEY) {
        // Sin clave (desarrollo local): no se envía nada, solo se muestra en la terminal.
        console.log(`\n--- [correo simulado] ---\nPara: ${correo.to}\nAsunto: ${correo.subject}\n\n${correo.text}\n-------------------------\n`);
        return true;
    }
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
        from: EMAIL_ORIGEN,
        to: correo.to,
        subject: correo.subject,
        text: correo.text,
        replyTo: correo.replyTo,
    });
    if (error) console.error('Resend:', error);
    return !error;
}

export const POST: APIRoute = async ({ request }) => {
    let datos: FormData;
    try {
        datos = await request.formData();
    } catch {
        return json({ ok: false, errores: ['busqueda'] }, 400);
    }

    // Campo trampa para bots: un usuario real no lo ve ni lo rellena. Fingimos éxito.
    if (datos.get('web')) return json({ ok: true });

    const resultado = validarSolicitud(datos, tarifas as unknown as Tarifas);
    if (!resultado.ok) return json({ ok: false, errores: resultado.errores }, 400);

    const { solicitud } = resultado;

    // El aviso a la empresa es lo importante: si falla, el cliente debe saberlo.
    const empresaOk = await enviar(correoParaEmpresa(solicitud, EMAIL_DESTINO));
    if (!empresaOk) return json({ ok: false, errores: [] }, 502);

    // El acuse al cliente es secundario: si falla, la solicitud ya ha llegado a la empresa.
    await enviar(correoParaCliente(solicitud));

    return json({ ok: true });
};