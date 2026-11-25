import { readFileSync, writeFileSync } from 'node:fs';

const textos = {
  es: {
    theme: 'Tema oscuro',
    filters: {
      title: 'Filtrar', gearbox: 'Cambio', type: 'Tipo', seats: 'Plazas', anySeats: 'Cualquiera',
      seatsMin: '{n} o más', sort: 'Ordenar por',
      sortAsc: 'Precio total, de menor a mayor', sortDesc: 'Precio total, de mayor a menor', sortSeats: 'Más plazas',
      showing: '{n} de {total} grupos', noMatch: 'Ningún grupo cumple esos filtros. Prueba a quitar alguno.',
      tiers: 'Precio por día según los días de alquiler',
      types: { utilitario: 'Utilitarios', suv: 'SUV', descapotable: 'Descapotables', furgoneta: 'Furgonetas y familiares' },
    },
  },
  en: {
    theme: 'Dark theme',
    filters: {
      title: 'Filter', gearbox: 'Gearbox', type: 'Type', seats: 'Seats', anySeats: 'Any',
      seatsMin: '{n} or more', sort: 'Sort by',
      sortAsc: 'Total price, low to high', sortDesc: 'Total price, high to low', sortSeats: 'Most seats',
      showing: '{n} of {total} groups', noMatch: 'No group matches those filters. Try removing one.',
      tiers: 'Price per day depending on rental length',
      types: { utilitario: 'Small cars', suv: 'SUVs', descapotable: 'Convertibles', furgoneta: 'Vans and people carriers' },
    },
  },
  de: {
    theme: 'Dunkles Design',
    filters: {
      title: 'Filtern', gearbox: 'Getriebe', type: 'Typ', seats: 'Sitze', anySeats: 'Beliebig',
      seatsMin: '{n} oder mehr', sort: 'Sortieren nach',
      sortAsc: 'Gesamtpreis, aufsteigend', sortDesc: 'Gesamtpreis, absteigend', sortSeats: 'Meiste Sitze',
      showing: '{n} von {total} Gruppen', noMatch: 'Keine Gruppe passt zu diesen Filtern. Entfernen Sie einen Filter.',
      tiers: 'Preis pro Tag je nach Mietdauer',
      types: { utilitario: 'Kleinwagen', suv: 'SUV', descapotable: 'Cabrios', furgoneta: 'Transporter und Großraumwagen' },
    },
  },
  fr: {
    theme: 'Thème sombre',
    filters: {
      title: 'Filtrer', gearbox: 'Boîte', type: 'Type', seats: 'Places', anySeats: 'Toutes',
      seatsMin: '{n} ou plus', sort: 'Trier par',
      sortAsc: 'Prix total, du moins cher au plus cher', sortDesc: 'Prix total, du plus cher au moins cher', sortSeats: 'Plus de places',
      showing: '{n} groupes sur {total}', noMatch: "Aucun groupe ne correspond à ces filtres. Essayez d'en retirer un.",
      tiers: 'Prix par jour selon la durée de location',
      types: { utilitario: 'Citadines', suv: 'SUV', descapotable: 'Cabriolets', furgoneta: 'Utilitaires et monospaces' },
    },
  },
  it: {
    theme: 'Tema scuro',
    filters: {
      title: 'Filtra', gearbox: 'Cambio', type: 'Tipo', seats: 'Posti', anySeats: 'Qualsiasi',
      seatsMin: '{n} o più', sort: 'Ordina per',
      sortAsc: 'Prezzo totale, dal più basso', sortDesc: 'Prezzo totale, dal più alto', sortSeats: 'Più posti',
      showing: '{n} gruppi su {total}', noMatch: 'Nessun gruppo corrisponde a questi filtri. Prova a toglierne uno.',
      tiers: 'Prezzo al giorno in base ai giorni di noleggio',
      types: { utilitario: 'Utilitarie', suv: 'SUV', descapotable: 'Cabrio', furgoneta: 'Furgoni e monovolume' },
    },
  },
};

for (const [lang, t] of Object.entries(textos)) {
  const ruta = `src/i18n/${lang}.json`;
  const original = readFileSync(ruta, 'utf8');
  const d = JSON.parse(original);
  d.nav.theme = t.theme;
  d.results.filters = t.filters;
  // Respeta los saltos de línea del archivo (en Windows suelen ser CRLF).
  const eol = original.includes('\r\n') ? '\r\n' : '\n';
  writeFileSync(ruta, JSON.stringify(d, null, 2).replace(/\n/g, eol) + eol);
}
console.log('Textos de la fase 10 añadidos a es, en, de, fr, it');