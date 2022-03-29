import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';

const Rotas: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default Rotas;
