import styled from 'styled-components';

const StarContainer = styled.div`
  max-width: 14rem;
  display: flex;
  justify-content: space-evenly;

  .star {
    display: block;
    width: 3.5rem;
    height: 2.6rem;
    background-color: gray;

    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
  }

  .sparkle {
    background-color: gold;
  }

  sup {
    font-size: 1.2rem;
    margin-left: 0.2em;
  }
`;

export { StarContainer };
