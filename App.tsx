import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import { StepsProvider } from './src/contexts/steps/StepsContext';
import { MotionProvider } from './src/contexts/motion/MotionContext';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';

function ThemeAwareStatusBar() {
  const { theme } = useTheme();
  // For a dark app background we want a light status bar and vice versa.
  return <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />;
}

export default function App() {
  return (
    <AuthProvider>
      <StepsProvider>
        <MotionProvider>
          <ThemeProvider>
            <ThemeAwareStatusBar />
            <AppNavigator />
          </ThemeProvider>
        </MotionProvider>
      </StepsProvider>
    </AuthProvider>
  );
}