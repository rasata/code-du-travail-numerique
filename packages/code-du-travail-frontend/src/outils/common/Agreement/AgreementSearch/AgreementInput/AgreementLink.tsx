import { formatIdcc } from "@socialgouv/modeles-social";
import { Paragraph } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";
import { Agreement } from "../../../../../conventions/Search/api/type";
import { ResultItem } from "../../components/ResultList";

type AgreementItemProps = {
  agreement: Agreement;
  isFirst: boolean;
  onClick: (agreement: Agreement) => void;
};

export function AgreementLink({
  agreement,
  isFirst,
  onClick,
}: AgreementItemProps): JSX.Element {
  const { num, shortTitle } = agreement;

  const clickHandler = () => {
    onClick(agreement);
  };

  return (
    <ResultItem isFirst={isFirst} onClick={clickHandler}>
      {shortTitle} <IDCC>(IDCC {formatIdcc(num)})</IDCC>
      {agreement.highlight && agreement.highlight.searchInfo && (
        <Paragraph variant="altText" noMargin>
          {agreement.highlight.searchInfo}
        </Paragraph>
      )}
    </ResultItem>
  );
}

const IDCC = styled.span`
  font-weight: normal;
`;
