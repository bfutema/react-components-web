import React from 'react';

import { Container } from './styles';

interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export { AuthLayout };
