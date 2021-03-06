import client from "../../client";
import groq from "groq";
import NavigationBar from "../../components/NavigationBar";
import BlockContent from "@sanity/block-content-to-react";
import { Wrapper } from "../../components/Wrapper";
import { PageTitle } from "../../components/PageTitle";
import styled from "styled-components";

//for dynamic routing---------------
export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

//getting props from sanity---------
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
  //making sure the trick data is here, otherwise return nothing-----
  if (trick === undefined) {
    return null;
  }

  return (
    <>
      <Wrapper>
        <NavigationBar />
        <main>
          <PageTitle>{trick && trick.title}</PageTitle>
          <SectionBase>
            {trick.image ? (
              <img
                src={trick.image.asset.url}
                alt={`image of ${trick.title}`}
              />
            ) : (
              <img id="skeleton-pic" src="/images/skates.jpeg" />
            )}
            <article aria-label="Description and information about the trick">
              <h2>Description</h2>
              <span>
                {trick && <BlockContent id="descrip" blocks={trick.body} />}
              </span>
            </article>
          </SectionBase>
        </main>
      </Wrapper>
    </>
  );
};

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
