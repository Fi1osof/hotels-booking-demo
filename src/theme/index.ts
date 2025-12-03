export const theme = {
  colors: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    secondary: '#f1f5f9',
    secondaryHover: '#e2e8f0',

    text: '#1e293b',
    textMuted: '#64748b',
    textLight: '#94a3b8',

    border: '#e2e8f0',
    borderHover: '#cbd5e1',

    background: '#fff',
    backgroundMuted: '#f8fafc',

    success: '#16a34a',
    successBg: '#dcfce7',
    warning: '#d97706',
    warningBg: '#fef3c7',

    star: '#fbbf24',
    starEmpty: '#e2e8f0',
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },

  radii: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    focus: '0 0 0 3px rgba(37, 99, 235, 0.1)',
  },

  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
  },
} as const

export type Theme = typeof theme
