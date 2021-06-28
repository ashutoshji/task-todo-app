import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 400px;
    margin-top: 10vh;
`
const Message = styled.h1`
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 3.2rem;
    color: #DE3C4B;
    margin-top: 15%;
    margin-left: 15%;
    letter-spacing: 1px;
    line-height: 60px;
    font-weight: 900;
    font-style: italic;
    text-align: center;
`

const ErrorMessage = (props) => {
  const text = `Your search "${props.searchInput}" is not the name of a task`
  return (
      <Container>
          <Message>{text}</Message>
      </Container>
  );
}
export default ErrorMessage;