import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './app/app';

const root = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<App />} />
    </Routes>
  </BrowserRouter>,
);
