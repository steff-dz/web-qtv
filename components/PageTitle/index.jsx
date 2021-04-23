import styled from "styled-components";

export const PageTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSizes[8]};
  font-family: ${(props) => props.theme.titleFont};
  text-align: center;
  font-weight: 600;
`;
