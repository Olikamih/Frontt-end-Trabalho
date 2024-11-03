import styled from 'styled-components';

const StyledAvatar = styled.div`
  img {
    height: 3.5rem;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary},
    0 0 16px 8px ${({ theme }) => theme.colors.shadow};
  }
`;

export default StyledAvatar;
