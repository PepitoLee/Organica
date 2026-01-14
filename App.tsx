import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import HistoriaPage from './pages/HistoriaPage';
import InclusionPage from './pages/InclusionPage';
import { CartProvider } from './store';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="productos" element={<ProductsPage />} />
            <Route path="historia" element={<HistoriaPage />} />
            <Route path="inclusion" element={<InclusionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
