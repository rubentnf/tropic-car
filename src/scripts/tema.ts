import { alternarTema, esTema, temaInicial } from '../lib/tema';

const raiz = document.documentElement;
const botones = document.querySelectorAll<HTMLButtonElement>('[data-tema-boton]');
const consulta = window.matchMedia('(prefers-color-scheme: dark)');

function guardado(): string | null {
    try {
        return localStorage.getItem('tema');
    } catch {
        return null;
    }
}

function aplicar(tema: string): void {
    raiz.setAttribute('data-tema', tema);
    for (const b of botones) b.setAttribute('aria-pressed', String(tema === 'oscuro'));
}

aplicar(esTema(raiz.dataset.tema) ? raiz.dataset.tema : temaInicial(guardado(), consulta.matches));

for (const b of botones) {
    b.addEventListener('click', () => {
        const nuevo = alternarTema(raiz.dataset.tema);
        aplicar(nuevo);
        try {
            localStorage.setItem('tema', nuevo);
        } catch {
            /* sin almacenamiento (modo privado): el cambio vale solo para esta visita */
        }
    });
}

// Si la persona no ha elegido nada, la web sigue al dispositivo cuando este cambia (por ejemplo, de día a noche).
consulta.addEventListener('change', () => {
    if (!esTema(guardado())) aplicar(temaInicial(null, consulta.matches));
});
