import styled from 'styled-components';

const Section = styled.section`
  .list {
    width: 100%;
    list-style: none;
    margin-top: 4rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 24rem));
    justify-content: center;
    gap: 2rem;
  }

  .nothing {
    font-size: 2rem;
    font-weight: bold;
    color: ${({theme})=>theme.colors.secondary};
  }
`;

export default Section;
