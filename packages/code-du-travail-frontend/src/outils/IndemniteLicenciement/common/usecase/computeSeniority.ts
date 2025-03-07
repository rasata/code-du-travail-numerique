import { differenceInMonths } from "date-fns";
import { parse } from "../../../common/utils";
import {
  Absence,
  MOTIFS,
} from "../../steps/Anciennete/components/AbsencePeriods";

type Props = {
  dateEntree: string;
  dateSortie: string;
  absencePeriods?: Absence[];
};

const computeSeniority = ({
  dateEntree,
  dateSortie,
  absencePeriods = [],
}: Props) => {
  const dEntree = parse(dateEntree);
  const dSortie = parse(dateSortie);

  // on calcule totalAbsence en mois par année (ex: 12mois = 1)
  // pour pouvoir ensuite le retranché de l’anciennété qui est aussi en mois par année
  const totalAbsence =
    (absencePeriods || [])
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item) => {
        const motif = MOTIFS.find((motif) => motif.label === item.motif) as {
          label: string;
          value: number;
        };
        if (item.durationInMonth) {
          return total + item.durationInMonth * motif.value;
        }
        return total;
      }, 0) / 12;
  return differenceInMonths(dSortie, dEntree) / 12 - totalAbsence;
};

export default computeSeniority;
