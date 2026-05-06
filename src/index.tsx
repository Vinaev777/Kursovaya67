import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Глобальные CSS переменные для тёмной темы
const style = document.createElement('style');
style.textContent = `
  :root {
    --color-background-primary: #1a1a2e;
    --color-background-secondary: #16213e;
    --color-background-tertiary: #0f3460;
    --color-text-primary: #e0e0e0;
    --color-text-secondary: #888888;
    --color-border-tertiary: #2a2a4a;
    --color-border-secondary: #3a3a5a;
    --color-background-info: #3b82f6;
    --color-text-info: #ffffff;
    --color-background-success: #22c55e;
    --color-text-success: #ffffff;
    --color-background-danger: #ef4444;
    --color-text-danger: #ffffff;
    --color-background-warning: #eab308;
    --color-text-warning: #ffffff;
    --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    background: var(--color-background-primary);
    min-height: 100vh;
  }
`;

document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);