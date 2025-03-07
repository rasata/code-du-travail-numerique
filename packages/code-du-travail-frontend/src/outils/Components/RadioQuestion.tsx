import { InputRadio } from "@socialgouv/cdtn-ui";
import React from "react";

import { InlineError } from "../common/ErrorField";
import { Question } from "../common/Question";
import { RadioContainer } from "../common/stepStyles";

type Question = {
  label: string;
  value: string;
  id: string;
};

type Props = {
  onChangeSelectedOption: (value: unknown) => void;
  selectedOption: string | undefined;
  error?: string;
  label: string;
  questions: Question[];
  showRequired?: boolean;
  name: string;
};

export default function RadioQuestion({
  selectedOption,
  onChangeSelectedOption,
  error,
  label,
  questions,
  showRequired,
  name,
}: Props) {
  const [value, setValue] = React.useState(selectedOption ?? "");
  const onChange = (value: string) => {
    setValue(value);
    onChangeSelectedOption(value);
  };

  return (
    <>
      <Question required={showRequired}>{label}</Question>
      <RadioContainer>
        {questions.map((question, index) => (
          <InputRadio
            key={index}
            name={name}
            label={question.label}
            value={question.value}
            id={question.id}
            checked={value === question.value}
            onChange={() => onChange(question.value)}
          />
        ))}
        {error && <InlineError>{error}</InlineError>}
      </RadioContainer>
    </>
  );
}
