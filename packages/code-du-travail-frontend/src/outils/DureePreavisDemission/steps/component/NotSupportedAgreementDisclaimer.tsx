import React from "react";
import { Paragraph } from "@socialgouv/cdtn-ui";
import {
  MatomoBaseEvent,
  MatomoActionEvent,
  MatomoAgreementEvent,
} from "../../../../lib";
import { matopush } from "../../../../piwik";

type Props = {
  agreementUrl?: string;
};

const NotSupportedAgreementDisclaimer: React.FC<Props> = ({ agreementUrl }) => {
  React.useEffect(() => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.OUTIL,
      MatomoActionEvent.PREAVIS_DEMISSION,
      MatomoAgreementEvent.CC_BLOCK_USER,
    ]);
  }, []);
  return (
    <>
      <Paragraph>
        La convention collective sélectionnée n’est pas traitée par nos
        services. Nous vous invitons à consulter votre convention collective
        pour obtenir votre durée de préavis.{" "}
        {agreementUrl && (
          <>
            Vous pouvez consulter votre convention collective{" "}
            <a href={agreementUrl} target="_blank" rel="noreferrer">
              ici
            </a>
            .
          </>
        )}
      </Paragraph>
      <Paragraph>
        L’existence ou la durée du préavis de démission peut également être
        prévue par un accord d’entreprise ou à défaut, par un usage dans
        l’entreprise.
      </Paragraph>
    </>
  );
};

export default NotSupportedAgreementDisclaimer;
