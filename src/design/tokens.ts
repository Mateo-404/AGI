// Design tokens for Somos #AGI - Distinctive visual identity for UNRaf course platform
// Generated following frontend-design skill: intentional, opinionated, not templated

export const tokens = {
  // === COLOR ===
  // Core palette: warm academic neutrals with UNRaf purple as signature accent
  // Avoids: warm cream defaults, acid green, SaaS card grey, broadsheet hairlines
  color: {
    // Base neutrals - warm academic paper tone
    bg: '#faf8f5',           // Warm off-white, not clinical
    bgElevated: '#fff',      // Pure white for cards/modals
    bgSunken: '#f0ece5',     // Subtle depth
    ink: '#1a1815',          // Near-black with warmth
    inkMuted: '#6b645c',     // Warm grey
    inkFaint: '#b8b0a5',     // Very subtle
    line: '#e3ddd5',         // Warm divider

    // Signature: UNRaf purple - the ONE bold choice
    brand: '#5b2d8c',        // Deep academic purple
    brandLight: '#e8dff5',   // 10% brand
    brandLighter: '#f3edf8', // 5% brand
    brandDark: '#3d1d5c',    // For hover/active
    brandText: '#fff',       // On brand

    // Semantic - derived from brand, not generic red/green/blue
    ok: '#2d7d3a',           // Success - muted forest
    okBg: '#e5f3e8',
    warn: '#b87a00',         // Warning - ochre
    warnBg: '#fdf0d5',
    danger: '#b3261e',       // Danger - deep red
    dangerBg: '#fceae9',
    info: '#1e6bb8',         // Info - academic blue
    infoBg: '#e3eef7',

    // Cuatrimestre accents - distinct but harmonious
    cuatri: {
      1: '#5b2d8c',  // Purple - brand
      2: '#1e6bb8',  // Blue - communications/tech
      3: '#0d9488',  // Teal - data/optimization
      4: '#b87a00',  // Ochre - strategy/finance
      5: '#7c3aed',  // Violet - electives/AI
    },

    // Matter-specific accents (subtle, for badges/cards)
    materia: {
      'administracion-capital-humano': '#5b2d8c',
      'administracion-procesos': '#0d9488',
      'introduccion-comunicaciones': '#1e6bb8',
      'paradigmas-programacion': '#7c3aed',
      'ingles-1': '#ea580c',
      'universidad-sociedad-conocimientos': '#5b2d8c',
      'marketing': '#db2777',
      'calculo-costos': '#0891b2',
      'ingenieria-software': '#4b5563',
      'gestion-ventas': '#f59e0b',
      'control-gestion': '#0d9488',
      'introduccion-optimizacion': '#7c3aed',
      'introduccion-gestion-datos': '#2563eb',
      'gestion-operaciones': '#ea580c',
      'gestion-estrategica': '#dc2626',
      'financiamiento-inversion': '#059669',
      'gestion-tecnologias': '#0891b2',
      'ingles-2': '#ea580c',
      'unidad-electiva': '#f59e0b',
      'aprendizaje-automatico': '#7c3aed',
      'prospectiva-tecnologica': '#db2777',
      'trabajo-final-grado': '#16a34a',
    },
  },

  // === TYPOGRAPHY ===
  // Single family: Roboto Flex Variable (already loaded) - expressive, not generic
  // No all-caps labels, no monospace for data, no tracked-out eyebrows
  type: {
    families: {
      display: '"Roboto Flex Variable", "Roboto Flex", system-ui, sans-serif',
      body: '"Roboto Flex Variable", "Roboto Flex", system-ui, sans-serif',
    },
    scale: {
      // Modular scale 1.25 (major third) - harmonious, not mechanical
      xs: '0.75rem',    // 12px - captions, badges
      sm: '0.875rem',   // 14px - meta, small UI
      base: '1rem',     // 16px - body
      lg: '1.125rem',   // 18px - lead
      xl: '1.25rem',    // 20px - small heading
      '2xl': '1.563rem', // 25px - h3
      '3xl': '1.953rem', // 31px - h2
      '4xl': '2.441rem', // 39px - h1
      '5xl': '3.052rem', // 49px - hero
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    width: {
      normal: 100,
      condensed: 88,
      tight: 75,
    },
    lineHeight: {
      tight: 1.1,
      snug: 1.35,
      normal: 1.65,
      relaxed: 1.8,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.02em',
    },
  },

  // === SPACING ===
  // 8px base unit, consistent rhythm
  space: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
  },

  // === RADIUS ===
  // Not uniform - cards get more, buttons less, badges full
  radius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },

  // === SHADOWS ===
  // Layered, not flat SaaS grey - warm shadows with brand tint
  shadow: {
    xs: '0 1px 2px rgba(26,24,21,0.04)',
    sm: '0 2px 8px rgba(26,24,21,0.06)',
    md: '0 8px 24px rgba(26,24,21,0.08)',
    lg: '0 16px 48px rgba(26,24,21,0.10)',
    xl: '0 24px 64px rgba(26,24,21,0.12)',
    // Brand-tinted for focus/active
    brand: '0 0 0 3px rgba(91,45,140,0.25)',
    brandHover: '0 8px 24px rgba(91,45,140,0.15)',
  },

  // === MOTION ===
  // Restrained: one orchestrated entrance, meaningful micro-interactions
  motion: {
    durations: {
      instant: '0ms',
      fast: '120ms',
      normal: '200ms',
      slow: '350ms',
      entrance: '500ms',
    },
    easings: {
      easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
      easeIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
      easeInOut: 'cubic-bezier(0.87, 0, 0.13, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },

  // === LAYOUT ===
  layout: {
    maxWidth: {
      prose: '42rem',     // ~672px - optimal reading
      content: '56rem',   // ~896px - content with sidebar
      full: '72rem',      // ~1152px - wide layouts
    },
    sidebar: {
      width: '18rem',     // 288px
      mobile: '85vw',
    },
    header: {
      height: '3.25rem',  // 52px
    },
  },

  // === Z-INDEX ===
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    modal: 30,
    popover: 40,
    toast: 50,
    tooltip: 60,
  },

  // === BREAKPOINTS ===
  breakpoint: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export type Tokens = typeof tokens;

// === CSS VARIABLE GENERATOR ===
export function generateCSSVariables(): string {
  const { color, type, space, radius, shadow, motion, layout, zIndex, breakpoint } = tokens;
  
  let css = ':root {\n';
  
  // Colors
  Object.entries(color).forEach(([key, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        css += `  --color-${key}-${subKey}: ${subValue};\n`;
      });
    } else {
      css += `  --color-${key}: ${value};\n`;
    }
  });
  
  // Type
  css += '\n  /* Type */\n';
  Object.entries(type.scale).forEach(([key, value]) => {
    css += `  --text-${key}: ${value};\n`;
  });
  Object.entries(type.lineHeight).forEach(([key, value]) => {
    css += `  --leading-${key}: ${value};\n`;
  });
  
  // Space
  css += '\n  /* Space */\n';
  Object.entries(space).forEach(([key, value]) => {
    css += `  --space-${key}: ${value};\n`;
  });
  
  // Radius
  css += '\n  /* Radius */\n';
  Object.entries(radius).forEach(([key, value]) => {
    css += `  --radius-${key}: ${value};\n`;
  });
  
  // Shadow
  css += '\n  /* Shadow */\n';
  Object.entries(shadow).forEach(([key, value]) => {
    css += `  --shadow-${key}: ${value};\n`;
  });
  
  // Motion
  css += '\n  /* Motion */\n';
  Object.entries(motion.durations).forEach(([key, value]) => {
    css += `  --duration-${key}: ${value};\n`;
  });
  
  // Layout
  css += '\n  /* Layout */\n';
  Object.entries(layout.maxWidth).forEach(([key, value]) => {
    css += `  --max-${key}: ${value};\n`;
  });
  css += `  --sidebar-width: ${layout.sidebar.width};\n`;
  css += `  --header-height: ${layout.header.height};\n`;
  
  // Z-index
  css += '\n  /* Z-index */\n';
  Object.entries(zIndex).forEach(([key, value]) => {
    css += `  --z-${key}: ${value};\n`;
  });
  
  // Breakpoints
  css += '\n  /* Breakpoints */\n';
  Object.entries(breakpoint).forEach(([key, value]) => {
    css += `  --bp-${key}: ${value};\n`;
  });
  
  css += '}\n';
  
  // Dark mode
  css += `
@media (prefers-color-scheme: dark) {
  :root[data-tema="auto"],
  :root[data-tema="oscuro"] {
    --color-bg: #161412;
    --color-bg-elevated: #1c1916;
    --color-bg-sunken: #1f1c18;
    --color-ink: #f0ebe3;
    --color-ink-muted: #a89f94;
    --color-ink-faint: #5c564e;
    --color-line: #2d2822;
    --color-brand-light: #3d2a56;
    --color-brand-lighter: #2a1f3a;
    --color-ok-bg: #1a2d1e;
    --color-warn-bg: #3d2f14;
    --color-danger-bg: #3a1a18;
    --color-info-bg: #142436;
    --shadow-xs: 0 1px 2px rgba(0,0,0,0.2);
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.25);
    --shadow-md: 0 8px 24px rgba(0,0,0,0.3);
    --shadow-lg: 0 16px 48px rgba(0,0,0,0.35);
    --shadow-xl: 0 24px 64px rgba(0,0,0,0.4);
  }
}
`;
  
  return css;
}

// === MATERIA ICONS (iPhone-style emoji SVGs) ===
// These are simplified, clean SVG representations that work at small sizes
export const materiaIcons: Record<string, string> = {
  'administracion-capital-humano': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="10" r="5" stroke="currentColor" stroke-width="2"/><path d="M4 28c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  'administracion-procesos': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="16" y="6" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="28" y="6" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><path d="M12 14v4M24 14v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="10" y="18" width="12" height="8" rx="2" stroke="currentColor" stroke-width="2"/></svg>`,
  'introduccion-comunicaciones': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2"/><path d="M16 8v8l6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'paradigmas-programacion': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16l6-6 6 6M24 16l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 6v20" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/></svg>`,
  'ingles-1': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12h20M6 16h20M6 20h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="26" cy="16" r="4" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'universidad-sociedad-conocimientos': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 22l10-12 10 12M6 22h20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 10v12" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'marketing': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 6L16 16 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 16v10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  'calculo-costos': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" stroke-width="2"/><path d="M10 14h12M10 18h8M10 22h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  'ingenieria-software': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/><rect x="18" y="4" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/><rect x="4" y="18" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/><rect x="18" y="18" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/></svg>`,
  'gestion-ventas': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 18l6-6 6 6 6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 6v16" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/></svg>`,
  'control-gestion': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 16h16M8 20h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  'introduccion-optimizacion': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4L8 12l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 4v24" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/></svg>`,
  'introduccion-gestion-datos': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 10l10-6 10 6v12l-10 6-10-6v-12z" stroke="currentColor" stroke-width="2"/><path d="M16 4v24" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'gestion-operaciones': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M16 12v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="18" r="4" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'gestion-estrategica': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="16,4 28,10 28,22 16,28 4,22 4,10" stroke="currentColor" stroke-width="2"/><path d="M16 4v24M4 10l12 6 12-6" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'financiamiento-inversion': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 26h20M12 10l4-6 4 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 4v24" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'gestion-tecnologias': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 6v20M6 14l10-8 10 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="16" cy="26" rx="10" ry="3" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'ingles-2': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12h20M6 16h20M6 20h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="26" cy="16" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M24 14l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  'unidad-electiva': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="16,4 20.5,12.5 30,14.5 22.5,20.5 25,30 16,25 7,30 9.5,20.5 2,14.5 11.5,12.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'aprendizaje-automatico': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16l4-4 4 4 4-4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="16" r="6" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'prospectiva-tecnologica': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="16" cy="16" rx="10" ry="7" stroke="currentColor" stroke-width="2"/><path d="M16 9v14M9 16h14" stroke="currentColor" stroke-width="1.5"/></svg>`,
  'trabajo-final-grado': `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l10-4 10 4v16l-10 4-10-4v-16z" stroke="currentColor" stroke-width="2"/><path d="M16 4v24M8 12l10 4 10-4" stroke="currentColor" stroke-width="1.5"/></svg>`,
};

// === UNIDAD ICONS (per materia) ===
export const unidadIcons: Record<string, Record<number, string>> = {
  'administracion-procesos': {
    1: '📋',  // Calidad, Kaizen, PDCA
    2: '🔄',  // Proceso y BPM
    3: '🗺️',  // Mapa, Cadena de valor, Jerarquía
    4: '🎯',  // Diseño y mejora
    5: '🤖',  // Tecnología y automatización
    6: '👥',  // Gestión del cambio
  },
  'calculo-costos': {
    1: '📊',  // Contabilidad de costos
    2: '🧱',  // Elementos del costo
    3: '⚙️',  // Métodos y sistemas
    4: '📈',  // Análisis marginal
  },
  'gestion-ventas': {
    1: '🎯',  // Planeación
    2: '👤',  // Venta personal
    3: '🌍',  // Organización territorial
    4: '📅',  // Planeación de ventas
    5: '📚',  // Capacitación y desarrollo
    6: '💬',  // Venta consultiva
    7: '📊',  // Información de mercados
    8: '⚖️',  // Ética y RSE
  },
  'ingenieria-software': {
    1: '🖥️',  // Sistemas de información
    2: '🔄',  // Ciclo de vida
    3: '🎨',  // Diseño y modelado
    4: '🧪',  // Pruebas
    5: '⚙️',  // Metodologías ágiles
  },
  'introduccion-comunicaciones': {
    1: '📡',  // Modelos de información
    2: '🌐',  // Fundamentos de redes
    3: '🏗️',  // Modelo OSI
    4: '🔌',  // Redes LAN
    5: '📶',  // Capa física y topologías
    6: '🌍',  // Modelo TCP/IP
    7: '🚀',  // Diseño e innovación
    8: '🔐',  // Seguridad
  },
  'paradigmas-programacion': {
    1: '💡',  // Pensamiento computacional
    2: '🏗️',  // Ingeniería de software
    3: '📝',  // Requerimientos
    4: '🎭',  // Paradigmas
    5: '🔍',  // Testing
  },
  'universidad-sociedad-conocimientos': {
    1: '🏛️',  // Universidad argentina
    2: '📜',  // Historia
    3: '🔬',  // Conocimiento científico
  },
  'marketing': {
    1: '🎯',  // Fundamentos
    2: '👤',  // Consumidor
    3: '📍',  // Segmentación
    4: '🛍️',  // Producto
    5: '💰',  // Precio
    6: '📦',  // Plaza
    7: '📢',  // Promoción
    8: '📱',  // Marketing digital
  },
  'ingles-1': {
    1: '🔤',  // Verb to be
    2: '⏱️',  // Presente simple/continuo
    3: '🤔',  // Modales
    4: '📚',  // Vocabulario
  },
};

export function getMateriaIcon(slug: string): string {
  return materiaIcons[slug] || `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" stroke-width="2"/></svg>`;
}

export function getUnidadIcon(materiaSlug: string, unidadNum: number): string {
  return unidadIcons[materiaSlug]?.[unidadNum] || '📄';
}