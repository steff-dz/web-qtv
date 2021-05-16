import Head from "next/head";
import styled from "styled-components";
import { Wrapper } from "../components/Wrapper";
import NavigationBar from "../components/NavigationBar";

function Home() {
  return (
    <>
      <Head>
        <title>Quad Tricks Vault</title>
      </Head>
      <IndexWrapper aria-label="Site title, description and navigation">
        <HeroContainer aria-label="Container holding background image of a woman skating" />
        <MessageContainer>
          QTV is a place to find all the skating tricks on quad skates under the
          sun, from beginner to advanced.
        </MessageContainer>
        <NavigationBar />

        <MainBase role="heading" aria-level="1">
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
      </IndexWrapper>
    </>
  );
}

const IndexWrapper = styled(Wrapper)`
  overflow: hidden;
`;

const HeroContainer = styled.div`
  background-image: url("/images/hero.jpg");
  width: 60%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  right: 0;
  @media only screen and (max-width: 850px) {
    width: 100%;
    height: 100vh;
  }

  @media only screen and (max-width: 470px) {
    background-position: top center;
    height: 50vh;
  }
`;

const MainBase = styled.main`
  height: 100%;
  width: 40%;

  div {
    margin-top: 20vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[4]};

    span {
      width: 70%;
      background-color: ${(props) => props.theme.blue};
      box-shadow: -1px 2px 9px 0px #000000;
      font-size: 0;
      padding: 0 1rem;
      z-index: 10;
      @media only screen and (max-width: 850px) {
        width: fit-content;
      }

      &:nth-child(2) {
        background-color: ${(props) => props.theme.teal};
        width: 65%;
        @media only screen and (max-width: 850px) {
          width: fit-content;
        }
      }
      &:nth-child(3) {
        background-color: ${(props) => props.theme.green};
        width: 60%;
        @media only screen and (max-width: 850px) {
          width: fit-content;
        }
      }
    }
    h1 {
      font-family: ${(props) => props.theme.titleFont};
      font-size: ${(props) => props.theme.titleSize};
      color: ${(props) => props.theme.white};
      text-align: center;
      @media only screen and (max-width: 850px) {
        font-size: 4.5rem;
      }
    }
  }

  @media only screen and (max-width: 850px) {
    width: 100%;
    div {
      align-items: flex-end;
    }
    span {
      z-index: 100;
    }
  }

  @media only screen and (max-width: 470px) {
    div {
      margin-top: 12vh;
    }
  }
`;

const MessageContainer = styled.p`
  background-color: rgb(75, 137, 144, 0.8);
  color: white;
  width: 30%;
  height: fit-content;
  padding: 3rem;
  position: absolute;
  bottom: 40px;
  right: 50px;
  font-size: ${(props) => props.theme.textSize};
  line-height: ${(props) => props.theme.lineHeight};
  font-weight: 400;
  text-align: left;

  @media only screen and (max-width: 980px) {
    width: 50vw;
  }

  @media only screen and (max-width: 570px) {
    height: 30%;
    width: 80vw;
  }

  @media only screen and (max-width: 470px) {
    width: 100vw;
    left: 0px;
    height: fit-content;
  }
`;

export default Home;
