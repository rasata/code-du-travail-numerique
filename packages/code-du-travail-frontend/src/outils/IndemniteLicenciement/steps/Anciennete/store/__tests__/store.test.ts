import { loadPublicodesRules } from "../../../../../api";
import { createIndemniteLicenciementStore } from "../../../../store";
import { MOTIFS } from "../../components/AbsencePeriods";

describe("Ancienneté store", () => {
  let store = createIndemniteLicenciementStore(
    loadPublicodesRules("indemnite-licenciement")
  );

  // to reset store after each unit test
  afterEach(() => {
    store = createIndemniteLicenciementStore(
      loadPublicodesRules("indemnite-licenciement")
    );
  });

  it("should be defined and init", () => {
    expect(store).toBeDefined();
  });

  it("should init data input", () => {
    expect(store.getState().ancienneteData.input.absencePeriods).toStrictEqual(
      []
    );
    expect(store.getState().ancienneteData.input.dateEntree).toBe(undefined);
    expect(store.getState().ancienneteData.input.dateNotification).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.input.dateSortie).toBe(undefined);
    expect(store.getState().ancienneteData.input.hasAbsenceProlonge).toBe(
      undefined
    );
  });

  it("should init errors", () => {
    expect(store.getState().ancienneteData.error.errorAbsencePeriods).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorAbsenceProlonge).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateEntree).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateNotification).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateSortie).toBe(
      undefined
    );
  });

  it("should update properties", () => {
    store.getState().ancienneteFunction.onChangeDateEntree("20/02/2020");
    store.getState().ancienneteFunction.onChangeDateNotification("20/02/2021");
    store.getState().ancienneteFunction.onChangeDateSortie("20/02/2022");
    store.getState().ancienneteFunction.onChangeHasAbsenceProlonge("oui");
    store.getState().ancienneteFunction.onChangeAbsencePeriods([
      {
        durationInMonth: 2,
        motif: MOTIFS[0].label,
      },
    ]);
    expect(store.getState().ancienneteData.input.absencePeriods).toStrictEqual([
      {
        durationInMonth: 2,
        motif: MOTIFS[0].label,
      },
    ]);
    expect(store.getState().ancienneteData.input.dateEntree).toBe("20/02/2020");
    expect(store.getState().ancienneteData.input.dateNotification).toBe(
      "20/02/2021"
    );
    expect(store.getState().ancienneteData.input.dateSortie).toBe("20/02/2022");
    expect(store.getState().ancienneteData.input.hasAbsenceProlonge).toBe(
      "oui"
    );
  });

  it("should render an error for a date", () => {
    store.getState().ancienneteFunction.onChangeDateEntree("05/05/1821");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateStepAnciennete();
    expect(isValid).toBe(false);
    expect(store.getState().ancienneteData.error.errorDateEntree).toBe(
      "La date d'entrée est invalide"
    );
  });

  it("should render an error for date d'entrée > date de sortie", () => {
    store.getState().ancienneteFunction.onChangeDateEntree("05/05/2022");
    store.getState().ancienneteFunction.onChangeDateSortie("05/05/2021");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateStepAnciennete();
    expect(isValid).toBe(false);
    const hasMessageError = store
      .getState()
      .ancienneteData.error.errorDateSortie!.includes(
        "La date de sortie doit se situer après le <strong>"
      );
    expect(hasMessageError).toBe(true);
  });

  it("should render an error for date de notification > 18 last months", () => {
    store.getState().ancienneteFunction.onChangeDateNotification("05/05/2018"); // TODO: warning en 2020 ça marche pas
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateStepAnciennete();
    expect(isValid).toBe(false);
    expect(store.getState().ancienneteData.error.errorDateNotification).toBe(
      "La date de notification doit se situer dans les 18 derniers mois"
    );
  });

  it("should render an error for date de notification < date de sortie", () => {
    store.getState().ancienneteFunction.onChangeDateNotification("05/05/2021");
    store.getState().ancienneteFunction.onChangeDateSortie("05/05/2020");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateStepAnciennete();
    expect(isValid).toBe(false);
    expect(store.getState().ancienneteData.error.errorDateNotification).toBe(
      "La date de notification doit se situer avant la date de sortie"
    );
  });

  it("should render an error for date de notification > date d'entrée", () => {
    store.getState().ancienneteFunction.onChangeDateNotification("05/05/2020");
    store.getState().ancienneteFunction.onChangeDateEntree("05/05/2021");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateStepAnciennete();
    expect(isValid).toBe(false);
    expect(store.getState().ancienneteData.error.errorDateNotification).toBe(
      "La date de notification doit se situer après la date d’entrée"
    );
  });

  it("should render an error for date de notification > 8 mois d'ancienneté", () => {
    store.getState().ancienneteFunction.onChangeDateNotification("05/06/2021");
    store.getState().ancienneteFunction.onChangeDateEntree("05/05/2021");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateStepAnciennete();
    expect(isValid).toBe(false);
    expect(store.getState().ancienneteData.error.errorDateNotification).toBe(
      "L’indemnité de licenciement est dûe au-delà de 8 mois d’ancienneté"
    );
  });

  it("should render an error for uncompleted absences", () => {
    store.getState().ancienneteFunction.onChangeHasAbsenceProlonge("oui");
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateStepAnciennete();
    expect(isValid).toBe(false);
    expect(store.getState().ancienneteData.error.errorAbsencePeriods).toBe(
      "Vous devez renseigner tous les champs"
    );
  });

  it("should validate the step 🚀", () => {
    store.getState().ancienneteFunction.onChangeDateEntree("20/02/2020");
    store.getState().ancienneteFunction.onChangeDateNotification("20/02/2021");
    store.getState().ancienneteFunction.onChangeDateSortie("20/02/2022");
    store.getState().ancienneteFunction.onChangeHasAbsenceProlonge("oui");
    store.getState().ancienneteFunction.onChangeAbsencePeriods([
      {
        durationInMonth: 2,
        motif: MOTIFS[0].label,
      },
    ]);
    const isValid = store
      .getState()
      .ancienneteFunction.onValidateStepAnciennete();
    expect(isValid).toBe(true);
    expect(store.getState().ancienneteData.error.errorAbsencePeriods).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorAbsenceProlonge).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateEntree).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateNotification).toBe(
      undefined
    );
    expect(store.getState().ancienneteData.error.errorDateSortie).toBe(
      undefined
    );
  });
});
