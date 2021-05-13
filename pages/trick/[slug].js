import client from "../../client";
import groq from "groq";
import NavigationBar from "../../components/NavigationBar";
import BlockContent from "@sanity/block-content-to-react";
import { Wrapper } from "../../components/Wrapper";
import { PageTitle } from "../../components/PageTitle";
import styled from "styled-components";

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const query = groq`
    *[_type == 'tricks' && slug.current == '${slug}']{
      slug,
      title,
      body,
      "image": mainImage{asset->{url}}
    }[0]
  `;

  try {
    const data = await client.fetch(query);
    return {
      revalidate: 60 * 60 * 24,
      props: {
        trick: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

const TrickPage = ({ trick }) => {
  if (trick === undefined) {
    return null;
  }

  return (
    <>
      <StyledWrapper>
        <NavigationBar />
        <MainBase>
          <PageTitle>{trick && trick.title}</PageTitle>
          <SectionBase>
            {trick.image ? (
              <img src={trick.image.asset.url} />
            ) : (
              <img id="skeleton-pic" src="/images/skates.jpeg" />
            )}
            <article>
              <h2>Description</h2>
              <span>
                {trick && <BlockContent id="descrip" blocks={trick.body} />}
              </span>
            </article>
          </SectionBase>
        </MainBase>
      </StyledWrapper>
    </>
  );
};
const StyledWrapper = styled(Wrapper)`
  position: relative;
  min-height: 100vh;
  @media only screen and (max-width: 400px) {
    overflow: scroll;
    overflow-x: hidden;
  }
`;

const MainBase = styled.main``;

const SectionBase = styled.section`
  display: flex;
  width: 70vw;
  margin: 0 auto;

  img {
    max-width: 400px;
  }
  #skeleton-pic {
    width: 250px;
    opacity: 0.7;
  }
  article {
    background-color: ${(props) => props.theme.white};
    box-shadow: 1px 4px 9px 4px rgba(0, 0, 0, 0.47);
    padding: 6rem 4rem;
    width: 70%;
    h2 {
      font-size: ${(props) => props.theme.fontSizes[6]};
      margin-bottom: ${(props) => props.theme.spacing[5]};
    }
    span {
      font-size: ${(props) => props.theme.textSize};
      height: fit-content;
      letter-spacing: 1.5px;
      line-height: ${(props) => props.theme.lineHeight};
    }
  }

  @media only screen and (max-width: 1400px) {
    width: 90vw;
  }
  @media only screen and (max-width: 980px) {
    flex-direction: column;
    width: fit-content;

    padding-bottom: 50px;

    img,
    article {
      margin: 0 auto;
    }

    article {
      padding: 3rem 2rem;

      width: 400px;
      text-align: center;
      height: fit-content;
    }
  }

  @media only screen and (max-width: 410px) {
    img,
    article {
      width: 350px;
    }
  }
`;
export default TrickPage;
/* <img src={trick.image?.asset?.url} /> */
