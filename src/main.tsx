import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { PrimeReactProvider } from 'primereact/api';
import App from './App.tsx';
import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/lara-dark-blue/theme.css';
// import 'primereact/resources/themes/lara-light-blue/theme.css';

const primeStyles = {
  ripple: true,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={primeStyles}>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);
