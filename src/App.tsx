import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyles } from '@styles/global';

import { AppProvider } from './contexts';
import { Routes } from './routes';

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>

      <GlobalStyles />
    </AppProvider>
  );
};

export { App };
