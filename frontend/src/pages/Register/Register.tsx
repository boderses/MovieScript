import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

import { Input } from "components/Input";
import { InputPassword } from "components/InputPassword";
import { authLoadingSelector } from "store/auth/selectors/auth";
import { registerSchema } from "validation/registerSchema";
import { Register as RegisterData } from "types";
import { useAppDispatch } from "store";
import { authRegisterStart } from "store/auth/thunks/authRegister";
import { StyledContainer, StyledForm, StyledTitle } from "./styled";

export const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: yupResolver(registerSchema) });
  const dispatch = useAppDispatch();
  const loading = useSelector(authLoadingSelector);

  const onSubmit = (data: RegisterData) => {
    dispatch(authRegisterStart(data));
  };

  useEffect(() => reset(), [reset]);

  return (
    <StyledContainer>
      <StyledTitle variant="h4" component="h1">
        Register
      </StyledTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          disabled={loading}
          size="medium"
          inputOptions={register("name")}
          error={errors["name"]?.message}
          label="Name"
        />
        <Input
          disabled={loading}
          size="medium"
          inputOptions={register("email")}
          error={errors["email"]?.message}
          label="Email"
        />
        <InputPassword
          disabled={loading}
          size="medium"
          inputOptions={register("password")}
          error={errors["password"]?.message}
        />
        <InputPassword
          disabled={loading}
          size="medium"
          inputOptions={register("confirmPassword")}
          error={errors["confirmPassword"]?.message}
          label="Confirm password"
        />
        <Button
          disabled={loading}
          type="submit"
          size="large"
          variant="contained"
          color="secondary"
        >
          Register
        </Button>
      </StyledForm>
    </StyledContainer>
  );
};
