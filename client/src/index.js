import { initAuth } from 'lib/aws/auth';
import React from 'react';
import App from './components/App';
import { createRoot } from 'react-dom/client';

initAuth();

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
