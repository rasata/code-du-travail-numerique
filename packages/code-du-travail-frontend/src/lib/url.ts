import getConfig from "next/config";

import { MappingReplacement } from "../redirects";

const {
  publicRuntimeConfig: { AZURE_BASE_URL, AZURE_CONTAINER },
} = getConfig();

export const toUrl = (file: string): string => {
  if (!file) return "";
  const index = file.lastIndexOf("/");
  const filename = index !== -1 ? file.substring(index + 1) : file;
  return `${AZURE_BASE_URL}/${AZURE_CONTAINER}/${filename}`;
};

export const removeQueryParameters = (url: string): string => {
  const index = url.indexOf("?");
  return index !== -1 ? url.substring(0, index) : url;
};

export const urlRulesReplacement = (url: string): string => {
  let res = url;
  MappingReplacement.forEach(({ newSlug, sourcePath, previousSlugs }) => {
    sourcePath.forEach((v) => {
      if (url.includes(v)) {
        previousSlugs.forEach((pv) => {
          if (url.includes(pv)) {
            res = url.replace(pv, newSlug);
          }
        });
      }
    });
  });
  return res;
};
