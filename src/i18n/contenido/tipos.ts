export interface Seccion {
    titulo: string;
    parrafos: string[];
}

export interface PreguntaFrecuente {
    pregunta: string;
    respuesta: string;
}

export interface Contenido {
    footer: { avisoLegal: string; privacidad: string; cookies: string; configurarCookies: string };
    flota: {
        titulo: string;
        intro: string;
        tramos: Record<'1' | '2-3' | '4-6' | '7+', string>;
        nota: string;
        reservar: string;
    };
    contacto: {
        titulo: string;
        direccion: string;
        telefono: string;
        email: string;
        horario: string;
        abrirMapa: string;
        cargarMapa: string;
        preguntasTitulo: string;
        preguntas: PreguntaFrecuente[];
    };
    consentimiento: { texto: string; aceptar: string; rechazar: string };
    legal: {
        avisoLegal: Seccion[]; privacidad: Seccion[]; cookies: Seccion[]; titulos: {
            avisoLegal: string; privacidad: string; cookies: string
        }; aviso: string
    };
}