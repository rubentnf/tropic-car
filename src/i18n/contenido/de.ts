import type { Contenido } from './tipos';

export const de: Contenido = {
    footer: { avisoLegal: 'Impressum', privacidad: 'Datenschutz', cookies: 'Cookies', configurarCookies: 'Cookie-Einstellungen' },
    flota: {
        titulo: 'Unsere Flotte',
        intro: 'Vierzehn Fahrzeuggruppen. Preis pro Tag je nach Mietdauer, inklusive Steuern und Versicherung.',
        tramos: { '1': '1 Tag', '2-3': '2–3 Tage', '4-6': '4–6 Tage', '7+': '7 oder mehr' },
        nota: 'Die Modelle sind unverbindlich, „oder ähnlich“. Den Gesamtpreis berechnen wir, sobald Sie Ihre Daten wählen.',
        reservar: 'Preis für meine Daten ansehen',
    },
    contacto: {
        titulo: 'Kontakt',
        direccion: 'Adresse',
        telefono: 'Telefon',
        email: 'E-Mail',
        horario: 'Öffnungszeiten',
        abrirMapa: 'In Google Maps öffnen',
        cargarMapa: 'Karte hier laden',
        preguntasTitulo: 'Häufige Fragen',
        preguntas: [
            { pregunta: 'Welche Voraussetzungen muss der Fahrer erfüllen?', respuesta: 'Der Fahrer muss zwischen 25 und 75 Jahre alt sein und seit mindestens 5 Jahren einen Führerschein besitzen.' },
            { pregunta: 'Was ist im Preis enthalten?', respuesta: 'Steuern und Vollkaskoversicherung. Die Selbstbeteiligung beträgt 150 €, und auf Ihrer Karte wird kein Betrag blockiert.' },
            { pregunta: 'Ist meine Anfrage schon eine Buchung?', respuesta: 'Nein. Nach dem Absenden erhalten Sie eine E-Mail, dass sie bearbeitet wird; wir bestätigen sie telefonisch oder per E-Mail mit Ihnen.' },
            { pregunta: 'Kann man online bezahlen?', respuesta: 'Nein. Beim Senden der Anfrage wird nichts bezahlt; die Zahlungsbedingungen werden bei der Bestätigung vereinbart. [MIT DEM UNTERNEHMEN KLÄREN]' },
            { pregunta: 'Haben Sie Kindersitze?', respuesta: 'Ja: Babyschale, Kindersitz und Sitzerhöhung, für 5 € pro Tag.' },
        ],
    },
    consentimiento: {
        texto: 'Wir verwenden ein Statistik-Tool, um die Website zu verbessern, nur wenn Sie zustimmen. Sie können das jederzeit ändern.',
        aceptar: 'Akzeptieren',
        rechazar: 'Ablehnen',
    },
    legal: {
        aviso: 'Vorlage, die noch mit den Unternehmensdaten ergänzt und vor der Veröffentlichung von einer Fachperson geprüft werden muss.',
        titulos: { avisoLegal: 'Impressum', privacidad: 'Datenschutzerklärung', cookies: 'Cookie-Richtlinie' },
        avisoLegal: [
            { titulo: 'Inhaber der Website', parrafos: ['Diese Website gehört {razonSocial} (Handelsname {nombreComercial}), USt-/Steuernummer (CIF) {cif}, mit Sitz in {domicilio}.', 'Registerdaten: {registroMercantil}.', 'Kontakt: {email} · {telefono}.'] },
            { titulo: 'Gegenstand', parrafos: ['Die Website informiert über die Mietfahrzeuge und ermöglicht das Senden von Buchungsanfragen. Das Senden einer Anfrage ist keine bestätigte Buchung: Diese besteht erst, wenn das Unternehmen sie dem Kunden bestätigt.'] },
            { titulo: 'Preise', parrafos: ['Die angezeigten Preise enthalten Steuern und Versicherung. Maßgeblich ist der Preis, den das Unternehmen bei der Annahme der Anfrage bestätigt.'] },
            { titulo: 'Geistiges Eigentum', parrafos: ['Texte, Gestaltung und die übrigen Inhalte der Website gehören dem Inhaber oder werden mit Genehmigung verwendet. Sie dürfen ohne Erlaubnis nicht vervielfältigt werden.'] },
            { titulo: 'Haftung und anwendbares Recht', parrafos: ['Der Inhaber bemüht sich um korrekte Angaben und behält sich vor, sie zu aktualisieren. Diese Bedingungen unterliegen spanischem Recht.'] },
        ],
        privacidad: [
            { titulo: 'Verantwortlicher', parrafos: ['{razonSocial}, CIF {cif}, {domicilio}. Kontakt: {email}.'] },
            { titulo: 'Welche Daten wir verarbeiten und wozu', parrafos: ['Wenn Sie eine Anfrage senden: Name, Telefon, E-Mail, Alter, Jahre Führerschein, Flugnummer (optional), Anmerkungen und die Daten der gewählten Anmietung.', 'Wir verwenden sie, um Ihre Anfrage zu beantworten und die Buchung abzuwickeln. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b DSGVO).'] },
            { titulo: 'Wie sie übermittelt werden und wer sie erhält', parrafos: ['Die Website speichert die Anfragen nicht in einer Datenbank: Sie werden per E-Mail an das Unternehmen gesendet, und Sie erhalten eine Empfangsbestätigung.', 'Dabei sind Dienstleister beteiligt, die Daten im Auftrag des Unternehmens verarbeiten: der E-Mail-Versanddienst (Resend) und das Hosting der Website (Cloudflare). [INTERNATIONALE DATENÜBERMITTLUNGEN PRÜFEN]'] },
            { titulo: 'Speicherdauer', parrafos: ['Wir speichern Ihre Daten so lange, wie es zur Bearbeitung der Anfrage nötig ist, und danach für die gesetzlich vorgeschriebenen Fristen. [FRIST AUSSTEHEND]'] },
            { titulo: 'Ihre Rechte', parrafos: ['Sie können Ihre Rechte auf Auskunft, Berichtigung, Löschung, Widerspruch, Einschränkung und Übertragbarkeit ausüben, indem Sie an {email} schreiben.', 'Wenn Sie der Meinung sind, dass wir Ihre Daten nicht ordnungsgemäß verarbeitet haben, können Sie sich bei der spanischen Datenschutzbehörde (www.aepd.es) beschweren.'] },
        ],
        cookies: [
            { titulo: 'Was Cookies sind', parrafos: ['Das sind kleine Dateien, die eine Website auf Ihrem Gerät speichert. Diese Website verwendet für ihre Funktion keine eigenen Cookies.'] },
            { titulo: 'Was wir speichern', parrafos: ['Wir speichern in Ihrem Browser nur eine technische Einstellung: Ihre Entscheidung zu den Statistiken (akzeptieren oder ablehnen). Sie enthält keine personenbezogenen Daten.', 'Wenn Sie die Statistiken akzeptieren, wird ein Analysewerkzeug ({herramienta}) geladen, das die Nutzung der Website misst. Wenn Sie ablehnen, wird es nicht geladen.'] },
            { titulo: 'So ändern Sie Ihre Auswahl', parrafos: ['Klicken Sie am Ende jeder Seite auf „Cookie-Einstellungen“ oder löschen Sie die Websitedaten in Ihrem Browser.'] },
        ],
    },
};