/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;



const StyledApp = styled.div`
  background-color: orange;
  padding: 20px 50px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The World Oasis</H1>
        <Button>Check in</Button>
        <Input placeholder="Number of guests" type="number" />
      </StyledApp>
    </>
  );
};

export default App;
