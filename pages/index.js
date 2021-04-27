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
        <MessageContainer>
          QTV is a place to find all the skating tricks on quad skates under the
          sun, from beginner to advance.
        </MessageContainer>
        <NavigationBar />

        <MainBase>
          <div>
            <span>
              <h1>QUAD</h1>
            </span>
            <span>
              <h1>TRICKS</h1>
            </span>
            <span>
              <h1>VAULT</h1>
            </span>
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
  position: relative;
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
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  height: 100%;
  width: 40%;

  div {
    /* border: 1px solid purple; */
    margin-top: 17%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    span {
      width: 70%;
      background-color: #4b8990;

      box-shadow: -1px 2px 9px 0px #000000;
      &:nth-child(2) {
        background-color: #49aa9c;
        width: 80%;
      }
      &:nth-child(3) {
        background-color: #6bc996;
        width: 90%;
      }
    }

    h1 {
      font-family: ${(props) => props.theme.titleFont};
      font-size: 7rem;
      color: white;
      text-align: center;
      /* border: 1px solid orange; */
      /* letter-spacing: 5px;
      line-height: 10rem; */
      &:nth-child(2) {
      }
    }
  }
`;

const MessageContainer = styled.p`
  border: 1px solid black;
  background-color: rgb(75, 137, 144, 0.7);
  color: white;
  width: 30%;
  height: fit-content;
  padding: 1.5rem;
  position: absolute;
  bottom: 40px;
  right: 50px;
  font-size: 3rem;
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
