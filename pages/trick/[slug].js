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
      <NavigationBar />
      <Wrapper>
        <main>
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
        </main>
      </Wrapper>
    </>
  );
};

const SectionBase = styled.section`
  display: flex;
  width: 70%;
  min-height: 60%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.white};
  box-shadow: 1px 4px 9px 4px rgba(0, 0, 0, 0.47);
  img {
    width: 40%;
  }
  #skeleton-pic {
    width: 250px;
    opacity: 0.7;
  }
  article {
    padding: 6rem 4rem;
    h2 {
      font-size: ${(props) => props.theme.fontSizes[6]};
      margin-bottom: ${(props) => props.theme.spacing[5]};
    }
    span {
      font-size: ${(props) => props.theme.textSize};
      letter-spacing: 1.5px;
      line-height: ${(props) => props.theme.lineHeight};
    }
  }
`;
export default TrickPage;
/* <img src={trick.image?.asset?.url} /> */
