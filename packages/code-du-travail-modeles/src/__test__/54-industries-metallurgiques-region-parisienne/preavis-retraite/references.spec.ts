import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const MiseRetraiteCCReferences = [
  {
    article: "Article 34 bis de l'avenant mensuel",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000036772209/?idConteneur=KALICONT000005635149",
  },
  {
    article: "Article 11 bis de l'accord national du 10 juillet 1970",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023173509?idConteneur=KALICONT000005635602",
  },
];

const DepartRetraiteCCReferences = [
  {
    article: "Article 34 de l'avenant mensuel",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000032062291/?idConteneur=KALICONT000005635149",
  },
  {
    article: "Article 11 de l'accord national du 10 juillet 1970",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023173503",
  },
];

test.each`
  retirement  | expectedReferences
  ${"mise"}   | ${MiseRetraiteReferences.concat(MiseRetraiteCCReferences)}
  ${"depart"} | ${DepartRetraiteReferences.concat(DepartRetraiteCCReferences)}
`(
  "Vérification des références juridiques pour un employé en $retirement à la retraite",
  ({ retirement, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": 5,
        "contrat salarié . convention collective": "'IDCC0054'",
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
