import { Input, InputDate, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { UID } from "react-uid";
import styled from "styled-components";

import { InlineError } from "./ErrorField";
import { Question, Tooltip } from "./Question";
import { required } from "./validators";

type Props = {
  name: string;
  label: string;
  inputType?: string;
  validate?: (unknown) => string | undefined;
  validateOnChange?: boolean;
  tooltip?: Tooltip;
  placeholder?: string;
  onChange?: (values?: unknown) => void;
};

const TextQuestion = ({
  name,
  label,
  inputType = "text",
  validate,
  validateOnChange = false,
  tooltip,
  onChange,
  ...props
}: Props): JSX.Element => {
  const InputComponent = inputType === "date" ? InputDate : Input;
  return (
    <UID>
      {(id) => (
        <>
          <Question required tooltip={tooltip} htmlFor={id}>
            {label}
          </Question>
          <QuestionWrapper>
            <Field
              name={name}
              validate={(value) => {
                return validate ? validate(value) : required(value);
              }}
              subscription={{
                dirty: true,
                error: true,
                invalid: true,
                submitFailed: true,
                touched: true,
                value: true,
              }}
              render={({
                input,
                meta: { error, invalid, dirty, touched, submitFailed },
              }) => (
                <>
                  <InputComponent
                    {...input}
                    {...props}
                    id={id}
                    invalid={touched && invalid}
                  />
                  {invalid &&
                    ((!validateOnChange && submitFailed) ||
                      (validateOnChange && dirty)) && (
                      <ErrorWrapper>
                        <InlineError>{error}</InlineError>
                      </ErrorWrapper>
                    )}
                </>
              )}
            />
          </QuestionWrapper>
          <OnChange name={name}>
            {(values) => {
              onChange?.(values);
            }}
          </OnChange>
        </>
      )}
    </UID>
  );
};

export { TextQuestion };
const { spacings } = theme;

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacings.base};
`;
const ErrorWrapper = styled.div`
  display: inline-block;
  margin-left: ${spacings.medium};
`;
