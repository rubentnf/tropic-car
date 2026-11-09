# Tropic Rent a Car · instrucciones para Claude Code

@docs/CONTEXTO.md

## Cómo trabajar aquí
- Responde en español. Da archivos completos (no fragmentos sueltos) y, si algo falla, di el archivo y la línea exacta.
- Antes de dar algo por hecho, ejecuta: `npm run check`, `npm test` y `npm run build`. Los tres deben pasar.
- Commits en español con Conventional Commits (`feat(precios): …`). Una rama por fase `fase-N-nombre`, fusión `--no-ff` y etiqueta `fase-N`.
- Piel y lógica separadas: los colores y radios viven en `src/styles/tokens.css`; el aspecto de cada componente en `src/styles/global.css`. No pongas estilos en línea ni valores de color en componentes.
- Los textos visibles van en `src/i18n/*.json` (interfaz) y `src/i18n/contenido/*.ts` (textos largos). Si añades una clave, añádela en los cinco idiomas: hay un test que lo exige.
- Los datos que edita el cliente (`src/data/tarifas.json`, `src/data/empresa.json`) se declaran por completo en `public/admin/config.yml`; si añades un campo, añádelo ahí (el test `cms.test.ts` lo exige).
- El precio lo recalcula siempre el servidor (`src/lib/solicitud.ts`); nunca se confía en el del navegador.
- No inventes datos de la empresa ni condiciones comerciales: lo que falta está marcado `PENDIENTE` o `[A CONFIRMAR]`.