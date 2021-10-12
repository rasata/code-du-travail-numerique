import React, { ForwardedRef, useState } from "react";

import { Agreement } from "../../../conventions/Search/api/agreements.service";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
import { useTrackingContext } from "../common/TrackingContext";
import { SearchAgreementInput } from "./SearchAgreementInput";
import { searchEnterprises } from "../../../conventions/Search/api/enterprises.service";

type Props = {
  renderResults: (
    renderProps: FetchReducerState<Agreement[]>,
    query: string
  ) => JSX.Element;
  inputRef: ForwardedRef<HTMLFormElement>;
};

export function SearchAgreement({
  renderResults,
  inputRef,
}: Props): JSX.Element {
  const [query, setQuery] = useState("");
  const trackingContext = useTrackingContext();

  const useAgreementSuggester = createSuggesterHook(
    searchEnterprises,
    "cc_search",
    trackingContext
  );

  const state = useAgreementSuggester(query);

  const searchInputHandler = (keyEvent) => {
    const value = keyEvent.target.value;
    setQuery(value);
  };

  return (
    <>
      <SearchAgreementInput
        query={query}
        onChange={searchInputHandler}
        ref={inputRef}
      />
      {renderResults(state, query)}
    </>
  );
}
