import React from 'react';

import { Container } from './styles';

const Forms: React.FC = () => {
  return (
    <Container>
      <form
        style={{ gap: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}
      >
        <input type="text" />

        <input type="password" />

        <input type="checkbox" />

        <input type="email" />

        <input type="number" />

        <input type="file" />

        <input type="radio" />

        <input type="button" />

        <input type="color" />

        <input type="image" alt="Anexar" />

        <input type="hidden" />

        <input type="time" />

        <input type="date" />

        <input type="datetime-local" />

        <input type="week" />

        <input type="month" />

        <input type="url" />

        <input type="search" />

        <input type="tel" />

        <input type="range" />

        <input type="submit" />

        <input type="reset" />
      </form>
    </Container>
  );
};

export { Forms };
