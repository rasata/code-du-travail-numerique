import { MatomoBaseEvent, MatomoSimulatorEvent } from "../../../lib";
import { matopush } from "../../../piwik";

export default function printResult(simulatorTitle: string): void {
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    MatomoBaseEvent.OUTIL,
    MatomoSimulatorEvent.CLICK_PRINT,
    simulatorTitle,
  ]);
  const detailsTags = document.getElementsByTagName("details");
  for (let i = 0; i < detailsTags.length; i++) {
    detailsTags[i].setAttribute("open", "");
  }
  window.print();
}
