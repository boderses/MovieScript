import React, { useEffect } from "react";
import { Path, UseFormReturn, FieldValues } from "react-hook-form";

import { Input } from "../Input";
import { FormSkeleton } from "../FormSkeleton";
import { StyledButton, StyledForm, StyledButtonsContainer } from "./styled";

type InputInfo<T> = {
  label: string;
  name: Path<T>;
};

type FormProps<T extends FieldValues> = {
  loading: boolean;
  inputsInfo: InputInfo<T>[];
  hookFormData: UseFormReturn<T>;
  onCancel: () => void;
  onSubmit: (data: T) => void;
  submitButtonText: string;
  fetchLoading?: boolean;
};

export const Form = <T extends FieldValues>({
  loading,
  fetchLoading = false,
  onCancel,
  onSubmit,
  hookFormData,
  inputsInfo,
  submitButtonText,
}: FormProps<T>) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = hookFormData;

  useEffect(() => reset(), [reset]);

  return (
    <>
      {fetchLoading ? (
        <FormSkeleton inputsCount={inputsInfo.length} />
      ) : (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {inputsInfo.map(({ label, name }) => (
            <Input
              key={name as string}
              disabled={loading}
              inputOptions={register(name)}
              error={errors[name]?.message as string | undefined}
              label={label}
            />
          ))}
          <StyledButtonsContainer
            display="flex"
            gap="4px"
            justifyContent="flex-end"
          >
            <StyledButton
              color="silverGrey"
              disabled={loading}
              onClick={onCancel}
            >
              Cancel
            </StyledButton>
            <StyledButton
              disabled={loading}
              loading={loading}
              variant="contained"
              type="submit"
            >
              {submitButtonText}
            </StyledButton>
          </StyledButtonsContainer>
        </StyledForm>
      )}
    </>
  );
};
