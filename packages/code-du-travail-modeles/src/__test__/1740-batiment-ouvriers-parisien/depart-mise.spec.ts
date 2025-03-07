import Engine from "publicodes";

import { getNotifications } from "../..";
import { mergeModels } from "../../internal/merger";
import { getReferences } from "../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../common/legal-references";

const engine = new Engine(mergeModels());

const CommonReference = {
  article: "Article 1.1.12.a",
  url:
    "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801005?idConteneur=KALICONT000005635685",
};

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  CommonReference,
];

const MiseRetraiteCcReferences = [...MiseRetraiteReferences, CommonReference];

describe("Préavis de retraite de la CC 1740", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${2}
      ${6}      | ${1}
      ${24}     | ${2}
    `(
      "Pour un salarié possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1740'",
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "oui",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(DepartRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(DepartRetraiteCcReferences)
        );
      }
    );
  });

  describe("Vérification des mises à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${2}
      ${6}      | ${2}
      ${24}     | ${2}
    `(
      "Pour un salarié possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1740'",
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "oui",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(MiseRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(MiseRetraiteCcReferences)
        );
      }
    );
  });

  describe("Vérification des notifications", () => {
    test("Pour un salarié en départ à la retraite, une notification doit s'afficher", () => {
      const notifications = getNotifications(
        engine.setSituation({
          "contrat salarié . ancienneté": 5,
          "contrat salarié . convention collective": "'IDCC1740'",
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "oui",
        })
      );
      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toBe(
        "Le salarié doit notifier à l’employeur son départ en retraite par une lettre recommandée avec accusé de réception. Le départ en retraite aura lieu le premier jour d’un mois civil. Exemple: Si le 6 mars 2020 un salarié notifie sa décision de partir à la retraite à son employeur, le préavis à effectuer débutera le 1er avril 2020."
      );
    });
    test("Pour un salarié en mise à la retraite, une notification doit s'afficher", () => {
      const notifications = getNotifications(
        engine.setSituation({
          "contrat salarié . ancienneté": 5,
          "contrat salarié . convention collective": "'IDCC1740'",
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "oui",
        })
      );
      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toBe(
        "L’employeur doit notifier au salarié sa mise à la retraite par lettre recommandée avec accusé de réception. La mise à la retraite aura lieu le premier jour d'un mois civil. Exemple : Si le 6 mars 2020 un employeur notifie sa décision de mettre à la retraite son salarié, le préavis à effectuer débutera le 1er avril 2020."
      );
    });
  });
});
