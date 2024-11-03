/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 50px;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 30px;
      font-weight: 400;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 10px;
      font-weight: 300;
    `}

    line-height: 1.4
`;

export default Heading;
