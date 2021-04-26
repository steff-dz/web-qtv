import Head from "next/head";
import styled from "styled-components";
import { PageTitle } from "../components/PageTitle";
import { MainWrapper } from "../components/MainWrapper";
import Image from "next/image";
import NavigationBar from "../components/NavigationBar";

function Home() {
  return (
    <>
      <Head>
        <title>Quad Tricks Vault</title>
      </Head>
      <Wrapper>
        <HeroContainer />
        <NavigationBar />
        <MainBase>
          <div>
            <h1>Quad</h1>
            <h1>Tricks</h1>
            <h1>Vault</h1>
          </div>
        </MainBase>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: #546871;
  height: 100vh;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  background-image: url("/images/hero.jpg");
  width: 60%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  right: 0;
`;

const MainBase = styled.main`
  /* border: 3px solid pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 40%;

  div {
    padding-top: 20%;
    /* border: 1px solid purple; */
    width: fit-content;

    h1 {
      font-family: ${(props) => props.theme.titleFont};
      font-size: 12rem;
      color: white;
      /* border: 1px solid orange; */
      letter-spacing: 8px;
      line-height: 13rem;
      &:nth-child(2) {
        padding-left: 12%;
      }
    }
  }
`;

// const BackgroundImg = styled.div`;
//   background-image: url("/images/hero.jpg");
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: top center;
//   width: 700px;
//   height: auto;
// `;

// const SectionBase = styled.section`
//   display: flex;
//   width: 100%;
//   height: 100%;
//   background-color: #546871;

//   overflow: hidden;

//   #title-container {
//     width: 40%;

//   }

//   #title-container h1 {
//     font-family: ${(props) => props.theme.titleFont};
//     font-size: 8rem;
//     color: white;
//   }
// `;

// const ImageContainer = styled.div`
//   width: 60%;
//   background-image: url("/images/hero.jpg");
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: top center;
//   background-origin: content-box;

//   margin: 0 auto;
//   padding: 0 10rem;
//   padding-top: 10px;
//   column-count: 3;
//   column-gap: 10px;
//   column-fill: balance;

//   div {
//     width: fit-content;
//     height: fit-content;
//   }

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: contain;
//   }
//`;

export default Home;

/* <img src="/images/steff1.jpg" />

<img src="/images/ingcat1.jpg" />

<img src="/images/steff3.jpg" />

<img src="/images/ingcat3.jpg" />

<img src="/images/ingcat2.jpg" />

<img src="/images/steff2.jpg" />

<img src="/images/steff4.jpg" /> */
