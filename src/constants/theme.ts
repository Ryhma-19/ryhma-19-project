export const COLORS = {
  primary: '#4A90E2',      // Main in blue
  secondary: '#50C878',    // Success in green
  accent: '#FF6B6B',       // Alerts in red
  background: '#F5F5F5',   // App background
  surface: '#FFFFFF',      // Card backgrounds
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

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const TYPOGRAPHY = {
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