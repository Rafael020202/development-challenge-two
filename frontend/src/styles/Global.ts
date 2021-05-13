import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    outline: 0;
    padding: 0;
    margin: 0;
  }

  body, html, #root {
    height: 100%;
  }

  body, input, button, table {
    font: 16px 'Raleway', sans-serif;;
  }
  
`