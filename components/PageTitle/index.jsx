import styled from "styled-components";

export const PageTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSizes[8]};
  font-family: ${(props) => props.theme.titleFont};
  color: ${(props) => props.theme.black};
  text-align: center;
  font-weight: 600;
  letter-spacing: ${(props) => props.theme.spacing[2]};
`;
