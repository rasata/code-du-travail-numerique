import { ValidationErrors } from "final-form";

export type Step<Name extends string> = {
  name: Name;
  label: string;
  Component: () => JSX.Element;
  options?: {
    isForm?: boolean;
    annotation?: JSX.Element;
    hasNoMarginBottom?: boolean;
    validate?: (data) => ValidationErrors | undefined;
  };
};

export type SimulatorState = {
  currentStepIndex: number;
};

export type SimulatorActions = {
  nextStep: () => void;
  previousStep: () => void;
};

export type SimulatorStore = SimulatorState & SimulatorActions;
