import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { PrimeReactProvider } from 'primereact/api';
import App from './App.tsx';
import 'primeicons/primeicons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Callback from './components/Callback/Callback.tsx';

const primeStyles = {
  ripple: true,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={primeStyles}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  </StrictMode>,
);
