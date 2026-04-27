import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n'; // IMPORTANT: initializes i18next before App renders
import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error(
    'Root element #root was not found in index.html. ' +
      'Check that public/index.html contains <div id="root"></div>.',
  );
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
