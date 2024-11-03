import React from 'react';
import Container from './style';

interface Props {
  title: string;
}

const Section: React.FC<Props> = ({ title, children }) => {
  return (
    <Container>
      {title && <h2 className="title" >{title}</h2>}
      {children}
    </Container>
  );
};

export default Section;
