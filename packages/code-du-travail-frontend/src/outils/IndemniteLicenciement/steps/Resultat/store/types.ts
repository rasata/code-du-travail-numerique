import {
  IndemniteLicenciementPublicodes,
  PublicodesIndemniteLicenciementResult,
} from "@socialgouv/modeles-social";
import { StepData } from "../../../store";
import { InfoCalcul } from "../../../common/usecase/generateExplanation";

export type ResultStoreInput = {
  publicodesResult: PublicodesIndemniteLicenciementResult | null;
  seniority: number;
  salaireRef: number;
  infoCalcul?: InfoCalcul;
};

export type ResultStoreError = {};

export type ResultStoreData = StepData<ResultStoreInput, ResultStoreError>;

export type ResultStoreFn = {
  getPublicodesResult: () => void;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData & {
    publicodes?: IndemniteLicenciementPublicodes;
  };
  resultFunction: ResultStoreFn;
};
