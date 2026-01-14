import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeData } from './data/seed';

initializeData();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
