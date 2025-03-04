import React, { useState, ChangeEvent } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { RefCallBack } from "react-hook-form";
import { Input } from "components/Input/Input";

type InputPasswordProps = {
  disabled: boolean;
  size: "small" | "medium";
  inputOptions: {
    name: string;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    ref: RefCallBack;
  };
  error?: string;
  label?: string;
};

export const InputPassword = ({
  disabled,
  size,
  inputOptions,
  error,
  label = "Password",
}: InputPasswordProps) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const handlePasswordHide = () => {
    setTogglePassword((prevState) => !prevState);
  };

  return (
    <Input
      disabled={disabled}
      size={size}
      type={togglePassword ? "text" : "password"}
      inputProps={{
        endAdornment: (
          <InputAdornment sx={{ cursor: "pointer" }} position="end">
            <IconButton onClick={handlePasswordHide}>
              {togglePassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputOptions={inputOptions}
      error={error}
      label={label}
    />
  );
};
