import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";

function Home() {
  return (
    <>
      <Head>
        <title>Quad Tricks Vault</title>
      </Head>

      <MainBase>
        <PageTitle>Quad Tricks Vault</PageTitle>
        <ImageContainer>
          <img src="/images/steff1.jpg" />

          <img src="/images/ingcat1.jpg" />

          <img src="/images/steff3.jpg" />

          <img src="/images/ingcat3.jpg" />

          <img src="/images/ingcat2.jpg" />

          <img src="/images/steff2.jpg" />

          <img src="/images/steff4.jpg" />
        </ImageContainer>
      </MainBase>
    </>
  );
}

const MainBase = styled.main``;

const PageTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSizes[8]};
  font-family: ${(props) => props.theme.titleFont};
  text-align: center;
  font-weight: 400;
`;

const ImageContainer = styled.section`
  margin: 0 auto;
  padding: 0 10rem;
  padding-top: 10px;
  column-count: 3;
  column-gap: 10px;
  column-fill: balance;

  div {
    width: fit-content;
    height: fit-content;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default Home;
