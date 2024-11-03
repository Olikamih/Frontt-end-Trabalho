import React, { useCallback } from 'react';

import { StarContainer } from './style';

interface Props {
  rating: number;
}

const Star: React.FC<Props> = ({ rating }) => {
  const MAX_STARS = Array(5).fill(null);
  const floorRating = Math.floor(rating);

  const ratingStars = useCallback(
    (_, index: number) => {
      const className = floorRating - (index + 1) >= 0 ? 'sparkle' : '';
      return <span className={`star ${className}`} key={`star-${index}`} />;
    },
    [rating]
  );

  return (
    <StarContainer title={String(rating)}>
      {MAX_STARS.map(ratingStars)}
      <sup>({rating})</sup>
    </StarContainer>
  );
};

export default Star;
