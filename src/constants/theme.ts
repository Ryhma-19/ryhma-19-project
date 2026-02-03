export const LIGHT_THEME = {
  primary: '#4A90E2',
  secondary: '#50C878',
  accent: '#FF6B6B',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    light: '#BDC3C7',
  },
  border: '#E0E0E0',
  error: '#E74C3C',
  warning: '#F39C12',
  success: '#27AE60',
};

export const DARK_THEME = {
  primary: '#5DA9FF',
  secondary: '#63D68F',
  accent: '#FF6B6B',
  background: '#0E0E10',
  surface: '#1C1C1E',
  text: {
    primary: '#FFFFFF',
    secondary: '#BFC4C8',
    light: '#8F98A0',
  },
  border: '#2C2C2E',
  error: '#FF6B6B',
  warning: '#F39C12',
  success: '#27AE60',
};

// Keep a mutable COLORS object for backwards compatibility with existing imports.
export const COLORS: any = { ...LIGHT_THEME };

export type ThemeName = 'light' | 'dark';

export const THEMES = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
};

export function setTheme(mode: ThemeName) {
  const src = mode === 'dark' ? DARK_THEME : LIGHT_THEME;
  Object.keys(src).forEach((key) => {
    const k = key as keyof typeof src;
    // @ts-ignore
    COLORS[k] = (src as any)[k];
  });
}

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  fonts: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
};