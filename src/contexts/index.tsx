import React from 'react';

import { ThemeProvider } from './ReactThemeContext';

interface IAppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export { AppProvider };
