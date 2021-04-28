import Head from "next/head";
import styled from "styled-components";
import { Wrapper } from "../components/Wrapper";
import Image from "next/image";
import NavigationBar from "../components/NavigationBar";

function Home() {
  return (
    <>
      <Head>
        <title>Quad Tricks Vault</title>
      </Head>
      <IndexWrapper>
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
      </IndexWrapper>
    </>
  );
}

const IndexWrapper = styled(Wrapper)`
  overflow: hidden;
  position: relative;
`;

const HeroContainer = styled.div`
  background-image: url("/images/hero.jpg");
  width: 60%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  right: 0;
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
      &:nth-child(2) {
        background-color: ${(props) => props.theme.teal};
        width: 80%;
      }
      &:nth-child(3) {
        background-color: ${(props) => props.theme.green};
        width: 90%;
      }

      h1 {
        font-family: ${(props) => props.theme.titleFont};
        font-size: ${(props) => props.theme.fontSizes[8]};
        color: ${(props) => props.theme.white};
        text-align: center;
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

export default Home;
