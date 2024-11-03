import React, {
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Section, CommentForm, CommentContainer } from './style';
import { Input } from '../Input';

import { apiGet, apiPost } from '../../utils/api';
import useAccount from '../../hooks/useAccount';
import Select from '../Select';
import { Submit } from '../Button';
import User from '../User';
import Star from '../Star';
import { FlexContainer } from '../Container/style';
import handleRequest from '../../utils/handleRequests';
import { ProductComment } from '../../types/product';
import { SecondaryButton } from '../Button/style';
import { between } from '../../utils/validation/validations';

interface Props {
  productId: number;
}

interface CreateComment extends Props {
  setComments: Dispatch<SetStateAction<any[]>>;
}

const CreateComment: React.FC<CreateComment> = ({ productId, setComments }) => {
  const initialData = () => ({ rating: '1', comment: '' });

  const { avatar, name, id: userId } = useAccount().account;
  const [data, setData] = useState(initialData);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value, name } = e.target;
      if (!(name in data)) return;

      setData(prev => ({
        ...prev,
        [name]: value,
      }));
    },
    [data]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const { comment, rating } = data;

      const isBetweenMinAndMaxCharacters = between(comment.length, 20, 500);
      const isBetweenMinAndMaxValue = between(Number(rating), 1, 5);

      if (!isBetweenMinAndMaxCharacters || !isBetweenMinAndMaxValue) return;

      apiPost('/product/rate', {
        comment,
        rate: rating,
        user_id: userId,
        product_id: productId,
      }).then(({ data }) => {
        setComments(prev => [data.comment, ...prev]);
        setData(initialData);
      });
    },
    [data]
  );

  return (
    <CommentForm onSubmit={handleSubmit}>
      <FlexContainer as="header">
        <User avatar={avatar} name={name} />

        <div className="rating">
          <Select
            id="rating"
            name="rating"
            value={data.rating}
            options={Array(5)
              .fill(0)
              .map((_, i) => ({ value: i + 1, abbr: i + 1 }))}
            label="Avaliar: "
            onChange={handleChange}
          />
        </div>
      </FlexContainer>

      <div className="create-comment">
        <Input
          as="textarea"
          id="comment"
          name="comment"
          label="Comentário: "
          value={data.comment}
          onChange={handleChange}
        />
        <div className="create-comment__length">
          Caracteres: {data.comment.length} <br />
          Min: 20 <br />
          Máx: 500
        </div>
      </div>

      <Submit type="secondary">Enviar</Submit>
    </CommentForm>
  );
};

const Comment: React.FC<ProductComment> = ({ name, rate, comment, avatar }) => {
  return (
    <CommentContainer className="comment">
      <FlexContainer as="header">
        <User avatar={avatar} name={name} />
        <Star rating={rate} />
      </FlexContainer>

      <div className="content">{comment}</div>
    </CommentContainer>
  );
};

const CommentSection: React.FC<Props> = ({ productId }) => {
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const { id } = useAccount().account;

  const isOnMaxPage = page === pages;

  const handleCommentsRequest = useCallback(
    ({ data }) => {
      const isFirstPage = page === 1 ? true : false;
      const { comments, pages } = data;
      if (isFirstPage) {
        setComments(() => comments);
        setPages(() => pages);
      } else {
        setComments(prev => [...prev, ...comments]);
      }
    },
    [page]
  );

  const getComments = useCallback(() => {
    const { send, cancel } = apiGet(
      `/product/comments/${productId}?page=${page}`
    );

    send().then(handleCommentsRequest).catch(handleRequest(console.error));

    return cancel;
  }, [page]);

  useEffect(getComments, [page]);

  const nextPage = useCallback(() => {
    if (isOnMaxPage) return;
    setPage(prev => prev + 1);
  }, [page, isOnMaxPage]);

  const isUser = id != null;
  const hasComments = comments.length > 0;

  return isUser || hasComments ? (
    <Section>
      <h2 className="title">Comentários</h2>

      {isUser && (
        <CreateComment productId={productId} setComments={setComments} />
      )}

      {hasComments && (
        <>
          <hr />

          <ul className="comment-list">
            {comments.map(comment => (
              <Comment key={comment.id} {...comment} />
            ))}
          </ul>

          <SecondaryButton onClick={nextPage} disabled={isOnMaxPage}>
            Mais comentários
          </SecondaryButton>
        </>
      )}
    </Section>
  ) : (
    <div />
  );
};

export default CommentSection;
