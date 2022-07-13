import React, { useMemo, useState, useCallback } from 'react';

import { ThemeProvider as StyledProvider } from 'styled-components';
import { createContext } from 'use-context-selector';

import { colors } from '@components/bosons/colors';
import { IColors } from '@interfaces/generic/IColors';
import { themes } from '@styles/themes';

interface IThemeContextProps {
  theme: 'light' | 'dark';
  colors: IColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContextProps>(
  {} as IThemeContextProps,
);

interface IThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(
    () => setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light')),
    [],
  );

  const value: IThemeContextProps = useMemo(() => {
    return { theme, colors, toggleTheme };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <StyledProvider theme={themes[theme]}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
