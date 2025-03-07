import { computeSeniority } from "..";

describe("computeSeniority", () => {
  it("should compute seniority", () => {
    expect(
      computeSeniority({ dateEntree: "2017-04-01", dateSortie: "2018-04-01" })
    ).toEqual(1);
  });
  it("should compute seniority with periods of absence", () => {
    expect(
      computeSeniority({
        absencePeriods: [{ durationInMonth: 6, motif: "Congés sans solde" }],
        dateEntree: "2017-04-01",
        dateSortie: "2018-04-01",
      })
    ).toEqual(0.5);
  });
  it("should compute seniority with periods of absence divided by two for Congé parental", () => {
    expect(
      computeSeniority({
        absencePeriods: [
          { durationInMonth: 6, motif: "Congé parental d'éducation" },
        ],
        dateEntree: "2016-04-01",
        dateSortie: "2018-04-01",
      })
    ).toEqual(1.75);
  });
});
