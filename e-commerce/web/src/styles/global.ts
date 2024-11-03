import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 4px;
  }

  :root {
    font-size: 62.5%;
    font-family: 'Lato', sans-serif;
  }

  body {
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }

  html, body {
    width: 100%;
    max-width: 100vw;
  }

  .title {
    font-weight: 500;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.title};
  }
  
  #__next {
    height: 100%;
    min-height: 100vh;

    a {
      text-decoration: none;
    }

    .warn,
    .error  {
      text-align: center;
      margin: 2rem;
    }

    .warn {
      opacity: 0.4;
      font-size: 3rem;
      color: ${({ theme }) => theme.colors.text};
    }

    .error {
      display: block;
      font-size: 1.4rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  @keyframes loading-animation {
      to {
        transform: translate(-50%, 50%) scaleX(0);
      }
    }

  .load {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    &.loading {
      width: 100vw;
      min-height: 100vh;
      background-color: ${({ theme }) => theme.colors.white};

        &::after {
          content: '';
          position: absolute;
          height: 2rem;
          width: 10rem;
          background-color: ${({ theme }) => theme.colors.primary};

          top: 50%;
          left: 50%;
          transform: translate(-50%, 50%) scaleX(1.5);

          animation: loading-animation 1s cubic-bezier(.18,.89,.32,1.28) alternate
            infinite;
        }
      }
    }
`;

export default GlobalStyle;
