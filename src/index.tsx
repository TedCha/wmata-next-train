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
    font-size: 62.5%; // 1rem = 10px, 10px/16px = 62.5%
    --bp-largest: 75em;     // 1200px
    --bp-large: 68.75em;    // 1100px
    --bp-medium: 56.25em;   // 900px
    --bp-small: 37.5em;     // 600px
    --bp-smallest: 31.25em; // 500px
}

body {
    max-height: 100vh;
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
