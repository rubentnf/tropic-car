import type { Contenido } from './tipos';

export const fr: Contenido = {
    footer: { avisoLegal: 'Mentions légales', privacidad: 'Confidentialité', cookies: 'Cookies', configurarCookies: 'Paramètres des cookies' },
    flota: {
        titulo: 'Notre flotte',
        intro: 'Quatorze groupes de véhicules. Prix par jour selon la durée de location, taxes et assurance incluses.',
        tramos: { '1': '1 jour', '2-3': '2-3 jours', '4-6': '4-6 jours', '7+': '7 ou plus' },
        nota: 'Les modèles sont indicatifs, « ou similaire ». Le prix total est calculé quand vous choisissez vos dates.',
        reservar: 'Voir le prix pour mes dates',
    },
    contacto: {
        titulo: 'Contact',
        direccion: 'Adresse',
        telefono: 'Téléphone',
        email: 'E-mail',
        horario: 'Horaires',
        abrirMapa: 'Ouvrir dans Google Maps',
        cargarMapa: 'Charger la carte ici',
        mapaTitulo: 'Carte',
        preguntasTitulo: 'Questions fréquentes',
        preguntas: [
            { pregunta: 'Où puis-je récupérer et rendre la voiture ?', respuesta: 'Partout sur l’île : dans notre agence de Costa del Silencio, aux aéroports, aux ports, dans les hôtels, les appartements et les adresses privées. Indiquez le lieu et l’adresse dans la demande et nous vous confirmerons les conditions.' },
            { pregunta: 'Quelles conditions le conducteur doit-il remplir ?', respuesta: 'Avoir entre 25 et 75 ans et au moins 5 ans de permis de conduire.' },
            { pregunta: 'Que comprend le prix ?', respuesta: 'Les taxes et l’assurance tous risques. La franchise est de 150 € et aucun montant n’est bloqué sur votre carte.' },
            { pregunta: 'Ma demande est-elle déjà une réservation ?', respuesta: 'Non. Après l’envoi, vous recevez un e-mail indiquant qu’elle est en cours de traitement ; nous la confirmons avec vous par téléphone ou par e-mail.' },
            { pregunta: 'Peut-on payer en ligne ?', respuesta: 'Non. Rien n’est payé à l’envoi de la demande ; les conditions de paiement sont convenues lors de la confirmation. [À CONFIRMER AVEC L’ENTREPRISE]' },
            { pregunta: 'Avez-vous des sièges enfant ?', respuesta: 'Oui : siège-auto bébé, siège enfant et réhausseur, à 5 € par jour.' },
        ],
    },
    consentimiento: {
        texto: 'Nous utilisons un outil de statistiques pour améliorer le site, uniquement si vous l’acceptez. Vous pouvez changer d’avis à tout moment.',
        aceptar: 'Accepter',
        rechazar: 'Refuser',
    },
    legal: {
        aviso: 'Modèle à compléter avec les données de l’entreprise et à faire relire par un professionnel avant publication.',
        titulos: { avisoLegal: 'Mentions légales', privacidad: 'Politique de confidentialité', cookies: 'Politique de cookies' },
        avisoLegal: [
            { titulo: 'Propriétaire du site', parrafos: ['Ce site appartient à {razonSocial} (nom commercial {nombreComercial}), CIF {cif}, dont le siège est situé {domicilio}.', 'Données d’immatriculation : {registroMercantil}.', 'Contact : {email} · {telefono}.'] },
            { titulo: 'Objet', parrafos: ['Le site présente les véhicules de location et permet d’envoyer des demandes de réservation. L’envoi d’une demande ne constitue pas une réservation confirmée : celle-ci n’existe que lorsque l’entreprise la confirme au client.'] },
            { titulo: 'Prix', parrafos: ['Les prix affichés incluent les taxes et l’assurance. Le prix définitif est celui que l’entreprise confirme en acceptant la demande.'] },
            { titulo: 'Propriété intellectuelle', parrafos: ['Les textes, la conception et les autres contenus du site appartiennent à son titulaire ou sont utilisés avec autorisation. Ils ne peuvent pas être reproduits sans autorisation.'] },
            { titulo: 'Responsabilité et droit applicable', parrafos: ['Le titulaire s’efforce de fournir des informations exactes et se réserve le droit de les mettre à jour. Les présentes conditions sont régies par le droit espagnol.'] },
        ],
        privacidad: [
            { titulo: 'Responsable du traitement', parrafos: ['{razonSocial}, CIF {cif}, {domicilio}. Contact : {email}.'] },
            { titulo: 'Quelles données nous traitons et pourquoi', parrafos: ['Lorsque vous envoyez une demande : nom, téléphone, e-mail, âge, années de permis, numéro de vol (facultatif), commentaires et données de la location choisie.', 'Nous les utilisons pour répondre à votre demande et gérer la réservation. La base juridique est l’exécution de mesures précontractuelles prises à votre demande (art. 6.1.b du RGPD).'] },
            { titulo: 'Comment elles sont transmises et qui les reçoit', parrafos: ['Le site n’enregistre pas les demandes dans une base de données : elles sont envoyées par e-mail à l’entreprise et vous recevez un accusé de réception.', 'Des prestataires interviennent pour le compte de l’entreprise : le service d’envoi d’e-mails (Resend) et l’hébergement du site (Cloudflare). [VÉRIFIER LES TRANSFERTS INTERNATIONAUX]'] },
            { titulo: 'Conservation', parrafos: ['Nous conservons vos données le temps nécessaire pour traiter la demande, puis pendant les durées exigées par la loi. [DURÉE À PRÉCISER]'] },
            { titulo: 'Vos droits', parrafos: ['Vous pouvez exercer vos droits d’accès, de rectification, d’effacement, d’opposition, de limitation et de portabilité en écrivant à {email}.', 'Si vous estimez que vos données n’ont pas été correctement traitées, vous pouvez introduire une réclamation auprès de l’Agence espagnole de protection des données (www.aepd.es).'] },
        ],
        cookies: [
            { titulo: 'Ce que sont les cookies', parrafos: ['Ce sont de petits fichiers qu’un site enregistre sur votre appareil. Ce site n’utilise pas de cookies propres pour fonctionner.'] },
            { titulo: 'Ce que nous enregistrons', parrafos: ['Nous enregistrons dans votre navigateur une seule préférence technique : votre choix concernant les statistiques (accepter ou refuser). Elle ne contient aucune donnée personnelle.', 'Si vous acceptez les statistiques, un outil d’analyse des visites ({herramienta}) est chargé pour mesurer l’utilisation du site. Si vous les refusez, il n’est pas chargé.'] },
            { titulo: 'Comment modifier votre choix', parrafos: ['Cliquez sur « Paramètres des cookies » en bas de n’importe quelle page, ou supprimez les données du site dans votre navigateur.'] },
        ],
    },
};