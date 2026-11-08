import type { Contenido } from './tipos';

export const it: Contenido = {
    footer: { avisoLegal: 'Note legali', privacidad: 'Privacy', cookies: 'Cookie', configurarCookies: 'Impostazioni cookie' },
    flota: {
        titulo: 'La nostra flotta',
        intro: 'Quattordici gruppi di veicoli. Prezzo al giorno in base alla durata del noleggio, con tasse e assicurazione incluse.',
        tramos: { '1': '1 giorno', '2-3': '2-3 giorni', '4-6': '4-6 giorni', '7+': '7 o più' },
        nota: 'I modelli sono indicativi, «o simile». Il prezzo totale viene calcolato quando scegli le date.',
        reservar: 'Vedi il prezzo per le mie date',
    },
    contacto: {
        titulo: 'Contatti',
        direccion: 'Indirizzo',
        telefono: 'Telefono',
        email: 'Email',
        horario: 'Orari',
        abrirMapa: 'Apri in Google Maps',
        cargarMapa: 'Carica la mappa qui',
        preguntasTitulo: 'Domande frequenti',
        preguntas: [
            { pregunta: 'Quali requisiti deve avere il conducente?', respuesta: 'Avere tra 25 e 75 anni e almeno 5 anni di patente.' },
            { pregunta: 'Cosa include il prezzo?', respuesta: 'Tasse e assicurazione kasko. La franchigia è di 150 € e sulla tua carta non viene bloccato nessun importo.' },
            { pregunta: 'La mia richiesta è già una prenotazione?', respuesta: 'No. Dopo l’invio ricevi un’email che indica che è in elaborazione; la confermiamo con te per telefono o per email.' },
            { pregunta: 'Si può pagare online?', respuesta: 'No. All’invio della richiesta non si paga nulla; le condizioni di pagamento si concordano alla conferma. [DA CONFERMARE CON L’AZIENDA]' },
            { pregunta: 'Avete seggiolini per bambini?', respuesta: 'Sì: navicella, seggiolino e rialzo, a 5 € al giorno.' },
        ],
    },
    consentimiento: {
        texto: 'Usiamo uno strumento di statistiche per migliorare il sito, solo se lo accetti. Puoi cambiare idea in qualsiasi momento.',
        aceptar: 'Accetta',
        rechazar: 'Rifiuta',
    },
    legal: {
        aviso: 'Modello da completare con i dati dell’azienda e da far rivedere a un professionista prima della pubblicazione.',
        titulos: { avisoLegal: 'Note legali', privacidad: 'Informativa sulla privacy', cookies: 'Cookie policy' },
        avisoLegal: [
            { titulo: 'Titolare del sito', parrafos: ['Questo sito appartiene a {razonSocial} (nome commerciale {nombreComercial}), CIF {cif}, con sede in {domicilio}.', 'Dati di registro: {registroMercantil}.', 'Contatti: {email} · {telefono}.'] },
            { titulo: 'Oggetto', parrafos: ['Il sito fornisce informazioni sui veicoli a noleggio e permette di inviare richieste di prenotazione. L’invio di una richiesta non costituisce una prenotazione confermata: questa esiste solo quando l’azienda la conferma al cliente.'] },
            { titulo: 'Prezzi', parrafos: ['I prezzi mostrati includono tasse e assicurazione. Il prezzo definitivo è quello confermato dall’azienda all’accettazione della richiesta.'] },
            { titulo: 'Proprietà intellettuale', parrafos: ['I testi, la grafica e gli altri contenuti del sito appartengono al titolare o sono usati con permesso. Non possono essere riprodotti senza autorizzazione.'] },
            { titulo: 'Responsabilità e legge applicabile', parrafos: ['Il titolare si impegna a fornire informazioni corrette e si riserva il diritto di aggiornarle. Le presenti condizioni sono regolate dalla legge spagnola.'] },
        ],
        privacidad: [
            { titulo: 'Titolare del trattamento', parrafos: ['{razonSocial}, CIF {cif}, {domicilio}. Contatti: {email}.'] },
            { titulo: 'Quali dati trattiamo e perché', parrafos: ['Quando invii una richiesta: nome, telefono, email, età, anni di patente, numero del volo (facoltativo), commenti e dati del noleggio scelto.', 'Li usiamo per rispondere alla tua richiesta e gestire la prenotazione. La base giuridica è l’esecuzione di misure precontrattuali su tua richiesta (art. 6, par. 1, lett. b del GDPR).'] },
            { titulo: 'Come vengono inviati e chi li riceve', parrafos: ['Il sito non salva le richieste in un database: vengono inviate per email all’azienda e ricevi una conferma di ricezione.', 'Intervengono fornitori che trattano i dati per conto dell’azienda: il servizio di invio email (Resend) e l’hosting del sito (Cloudflare). [VERIFICARE I TRASFERIMENTI INTERNAZIONALI]'] },
            { titulo: 'Conservazione', parrafos: ['Conserveremo i tuoi dati per il tempo necessario a gestire la richiesta e, in seguito, per i periodi previsti dalla legge. [PERIODO DA DEFINIRE]'] },
            { titulo: 'I tuoi diritti', parrafos: ['Puoi esercitare i diritti di accesso, rettifica, cancellazione, opposizione, limitazione e portabilità scrivendo a {email}.', 'Se ritieni che i tuoi dati non siano stati trattati correttamente, puoi presentare un reclamo all’Agenzia spagnola per la protezione dei dati (www.aepd.es).'] },
        ],
        cookies: [
            { titulo: 'Cosa sono i cookie', parrafos: ['Sono piccoli file che un sito salva sul tuo dispositivo. Questo sito non usa cookie propri per funzionare.'] },
            { titulo: 'Cosa salviamo', parrafos: ['Salviamo nel tuo browser una sola preferenza tecnica: la tua scelta sulle statistiche (accettare o rifiutare). Non contiene dati personali.', 'Se accetti le statistiche, viene caricato uno strumento di analisi delle visite ({herramienta}) che misura l’uso del sito. Se le rifiuti, non viene caricato.'] },
            { titulo: 'Come cambiare la tua scelta', parrafos: ['Fai clic su «Impostazioni cookie» in fondo a qualsiasi pagina, oppure cancella i dati del sito nel tuo browser.'] },
        ],
    },
};