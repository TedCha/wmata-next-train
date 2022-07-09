import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
}

*,
*::before,
*::after {
    box-sizing: inherit;
}

html {
    box-sizing: border-box;
    font-size: 62.5%;       // 1rem = 10px, 10px/16px = 62.5%
}

body {
    /* Variables */
    --background-color-app: black;
    --border-color-app: #3c3c3c;

    background-color: var(--background-color-app);
    border: 1rem solid var(--border-color-app);
    min-height: 100vh;
}
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
