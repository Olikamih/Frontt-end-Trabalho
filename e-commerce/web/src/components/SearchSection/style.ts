import styled from 'styled-components';

const Section = styled.section`
  .search-bar {
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    #search {
      max-width: 32rem;
      margin-right: 1rem;
    }

    button[type='submit'] {
      width: 8.2rem;
      height: 100%;
      margin: 0;

      border-radius: 0.2em;
    }
  }

  .categories {
    margin-top: 2rem;
    list-style: none;
    display: flex;

    & > :not(:last-child) {
      margin-right: 2rem;
    }

    li {
      height: 3rem;
      font-size: 1.6rem;
    }
  }
`;

export { Section };
