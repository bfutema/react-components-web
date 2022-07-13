import React from 'react';
import { Routes as Router, Route } from 'react-router-dom';

import { Allocations } from '@pages/Main/Allocations';
import { Home } from '@pages/Main/Home';
import { Reports } from '@pages/Main/Reports';

const Routes: React.FC = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/allocations" element={<Allocations />} />
      <Route path="/reports" element={<Reports />} />
    </Router>
  );
};

export { Routes };
