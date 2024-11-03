import styled from 'styled-components';
import Container from '../Container/style';

const Section = styled(Container)`
  --child-padding: 2rem;

  .title {
    margin-bottom: 4rem;
  }

  hr {
    width: 100%;
    height: 0.2rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .comment-list {
    width: 100%;
    list-style: none;

    & > .comment:not(:last-child) {
      margin-bottom: 2.5rem;
    }
  }
`;

const CommentForm = styled.form`
  width: 100%;
  padding: 0 var(--child-padding);

  header {
    margin-bottom: 1rem;
  }

  .rating {
    width: 10rem;
  }

  .create-comment {
    --size: 10rem;

    .input {
      height: var(--size);
    }

    textarea {
      resize: none;
      height: var(--size);
      font-size: 1.8rem;
      font-weight: 500;
      padding: 0.8em;
    }

    &__length {
      margin-top: 1rem;
      font-size: 1.4rem;
    }
  }

  button[type='submit'] {
    align-self: flex-end;
    margin-top: 2rem;
    margin-left: auto;
  }

  @media screen and (min-width: 400px) {
    header {
      flex-direction: row;
    }
  }
`;

const CommentContainer = styled.li`
  width: 100%;
  min-height: 10rem;

  padding: var(--child-padding);
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 20px 24px 4px ${({ theme }) => theme.colors.shadow};

  .content {
    padding: 1em 0;
    font-size: 1.6rem;
  }

  header {
    @media screen and (min-width: 500px) {
      flex-direction: row;

      & > :not(:last-child) {
        margin-bottom: 0;
      }
    }
  }
`;

export { Section, CommentForm, CommentContainer };
