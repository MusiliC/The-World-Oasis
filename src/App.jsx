/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";




const StyledApp = styled.div`
  background-color: orange;
  padding: 20px 50px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as='h1'>The World Oasis</Heading>
        <Heading as='h2'>Check in and out - h2</Heading>
        <Heading as='h3'>Check out and in - h3</Heading>
        <Button>Check in</Button>
        <Input placeholder="Number of guests" type="number" />
      </StyledApp>
    </>
  );
};

export default App;
