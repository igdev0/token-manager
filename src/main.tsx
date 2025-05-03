import {StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {BrowserRouter} from 'react-router';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<h1> Loading </h1>}>
          <App/>
        </Suspense>
      </BrowserRouter>
    </StrictMode>,
);
