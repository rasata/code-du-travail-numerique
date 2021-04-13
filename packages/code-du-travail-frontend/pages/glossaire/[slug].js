import {
  Container,
  FlatList,
  PageTitle,
  Section,
  Table,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import getConfig from "next/config";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Html from "../../src/common/Html";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

function Term({ term: { term, definition, references } }) {
  return (
    <Layout>
      <Metas
        title={`${term} - Code du travail numérique`}
        description={definition}
      />
      <Section>
        <Container narrow>
          <PageTitle>{term}</PageTitle>
          <Wrapper variant="main">
            <Table>
              <tbody>
                <tr>
                  <th>Définition</th>
                  <td>
                    <Html>{definition}</Html>
                  </td>
                </tr>
                {references.length > 0 && (
                  <tr>
                    <th>Sources</th>
                    <td>
                      <StyledList>
                        {references.map((url) => (
                          <li key={url}>
                            <a
                              href={url}
                              target="_blank"
                              title="voir la référence"
                              rel="nofollow noreferrer noopener"
                            >
                              {url}
                            </a>
                          </li>
                        ))}
                      </StyledList>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <p>
              <Link href="/glossaire">
                <a>Retour</a>
              </Link>
            </p>
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
}
Term.getInitialProps = async ({ query: { slug } }) => {
  const responseContainer = await fetch(`${API_URL}/glossary/${slug}`);
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  const term = await responseContainer.json();
  return { term };
};
export default Term;

const { spacings } = theme;

const StyledList = styled(FlatList)`
  margin: ${spacings.small} 0;
  padding: 0;
  list-style-type: none;
`;
