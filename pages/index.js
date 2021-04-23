import Head from "next/head";
import styled from "styled-components";
import { PageTitle } from "../components/PageTitle";
import { MainWrapper } from "../components/MainWrapper";
import Image from "next/image";

function Home() {
  return (
    <>
      <Head>
        <title>Quad Tricks Vault</title>
      </Head>

      <MainWrapper>
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
      </MainWrapper>
    </>
  );
}

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
