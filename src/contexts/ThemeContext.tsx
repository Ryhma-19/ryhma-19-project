import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { setTheme, COLORS } from '../constants/theme';
import { useAuth } from './AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase/config';

export type ThemeName = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeName;
  colors: typeof COLORS;
  toggleTheme: (value?: ThemeName) => Promise<void>;
  setThemeMode: (value: ThemeName) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<ThemeName>(() => {
    return (user?.preferences?.theme as ThemeName) ?? (Appearance.getColorScheme() as ThemeName) ?? 'light';
  });

  useEffect(() => {
    if (user?.preferences?.theme) {
      setThemeState(user.preferences.theme as ThemeName);
      return;
    }

    const initial = (Appearance.getColorScheme() ?? 'light') as ThemeName;
    setThemeState(initial);

    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState((prev) => {
        // If user has explicit preference, do not override
        if (user?.preferences?.theme) return prev;
        return (colorScheme ?? 'light') as ThemeName;
      });
    });

    return () => {
      if (typeof sub.remove === 'function') sub.remove();
    };
  }, [user]);

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const persistTheme = async (newTheme: ThemeName) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        preferences: {
          ...(user.preferences ?? {}),
          theme: newTheme,
        },
      });
    } catch (err) {
      console.error('Failed to persist theme', err);
    }
  };

  const setThemeMode = async (newTheme: ThemeName) => {
    setThemeState(newTheme);
    await persistTheme(newTheme);
  };

  const toggleTheme = async (value?: ThemeName) => {
    const next = value ?? (theme === 'dark' ? 'light' : 'dark');
    await setThemeMode(next);
  };

  const value = { theme, colors: COLORS, toggleTheme, setThemeMode };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
