// @ts-check
// La «piel» vive en src/styles/tokens.css: es el único archivo donde se
// permiten valores literales de color y radio. El resto de CSS usa var(--…).

const MENSAJE_COLOR = 'Usa un token de tokens.css: var(--color-…)';

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['dist/**', '.astro/**', '.wrangler/**', 'node_modules/**'],
  rules: {
    // Clases en minúsculas con guiones; se admite BEM (bloque__elemento--modificador).
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(?:(?:-|__|--)[a-z0-9]+)*$',
      { message: 'Las clases van en minúsculas con guiones (p. ej. tarjeta-coche__precio)' },
    ],
    'custom-property-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
      { message: 'Los tokens van en minúsculas con guiones (p. ej. --color-fondo)' },
    ],

    // Fuera de tokens.css, nada de colores ni radios literales.
    'color-no-hex': [true, { message: MENSAJE_COLOR }],
    'color-named': ['never', { message: MENSAJE_COLOR }],
    'function-disallowed-list': [
      ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch'],
      { message: MENSAJE_COLOR },
    ],
    'declaration-property-value-allowed-list': [
      { '/radius$/': ['/^var\\(--/', '0', '50%', 'inherit'] },
      { message: 'Los radios salen de tokens.css: var(--radio-…)' },
    ],
  },
  overrides: [
    {
      // Aquí se definen los valores reales de la piel.
      files: ['src/styles/tokens.css'],
      rules: {
        'color-no-hex': null,
        'color-named': null,
        'function-disallowed-list': null,
        'declaration-property-value-allowed-list': null,
      },
    },
  ],
};
