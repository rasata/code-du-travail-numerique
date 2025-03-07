import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { Agreement } from "../../../conventions/Search/api/type";

export type AgreementSupportInfo = {
  fullySupported: boolean;
  idcc: number;
};

export type OnSelectAgreementFn = (
  agreement: Agreement | null,
  enterprise?: Enterprise
) => void;
