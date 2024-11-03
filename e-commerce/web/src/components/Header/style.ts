import styled from 'styled-components';
import Container from '../Container/style';

const StyledHeader = styled(Container)`
  width: 100%;
  height: 8rem;
  padding: 0.8rem;

  border-top: none;

  nav {
    height: 100%;
    width: 100%;
  }

  a, li {
    height: 100%;
  }

  a {
    padding: 1em;
  }


  .list {
    height: inherit;
    width: inherit;
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.8rem;
  }
`;

export default StyledHeader;
