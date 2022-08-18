import getConfig from "next/config";
import { SOURCES } from "@socialgouv/cdtn-sources";
import { Content, EditorialContentData } from "cdtn-types";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

export const getContentByIds = async (ids: string[]): Promise<any> => {
  const responseContainer = await fetch(
    `${API_URL}/items?ids=${ids.join(",")}&all=true`
  );
  return await responseContainer.json();
};

export const getContentBySlug = async (slug: string): Promise<any> => {
  const responseContainer = await fetch(
    `${API_URL}/items/${SOURCES.EDITORIAL_CONTENT}/${slug}`
  );
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  return await responseContainer.json();
};

export const getContentBlockIds = (contents: Content[]): string[] => {
  return contents.reduce((idsAcc: string[], content) => {
    content.blocks = content.blocks ?? [];
    return idsAcc.concat(
      content?.blocks?.flatMap(({ contents }) => {
        return (
          contents
            ?.map(({ cdtnId }) => cdtnId)
            ?.filter((cdtnId: string) => idsAcc.indexOf(cdtnId) === -1) ?? []
        );
      }) ?? []
    );
  }, []);
};

export const injectContentInfos = (
  contents: Content[],
  fetchedContents: EditorialContentData[]
) => {
  return contents.map((content) => {
    const blocks = content?.blocks?.map((block) => {
      const contents = block?.contents?.flatMap((blockContent) => {
        const contentFound = fetchedContents?.find(({ _source }) => {
          return _source.cdtnId === blockContent.cdtnId;
        });
        delete contentFound?._source.title_vector;
        return contentFound ? [contentFound._source] : [];
      });
      return { ...block, contents };
    });
    return { ...content, blocks };
  });
};
