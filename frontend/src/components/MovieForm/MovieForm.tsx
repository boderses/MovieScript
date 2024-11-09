import React, { useEffect, useMemo, useState } from "react";
import {
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  FormControl,
  Button,
  FormHelperText,
  Rating,
  Box,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { AnyObjectSchema } from "yup";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../Input";
import { Movie, MovieCategory, MovieFormSchema } from "types";
import { FormSkeleton } from "../FormSkeleton";
import {
  StyledButton,
  StyledForm,
  StyledButtonsContainer,
  StyledSkeleton,
} from "./styled";

type MovieFormProps = {
  loading: boolean;
  onCancel: () => void;
  onSubmit: (data: MovieFormSchema) => void;
  categories: MovieCategory[];
  schema: AnyObjectSchema;
  fetchCategoriesLoading: boolean;
  submitButtonText: string;
  fetchLoading?: boolean;
  defaultMovieProps?: Movie | Record<string, never>;
};

export const MovieForm = ({
  loading,
  fetchLoading = false,
  fetchCategoriesLoading,
  defaultMovieProps,
  categories,
  onCancel,
  submitButtonText,
  onSubmit,
  schema,
}: MovieFormProps) => {
  const [posterName, setPosterName] = useState<string | null>(null);

  const defaultValues = useMemo(
    () => ({
      title: defaultMovieProps?.title,
      description: defaultMovieProps?.description,
      categories:
        defaultMovieProps?.categories?.map((category) => category.name) || [],
      duration: defaultMovieProps?.duration,
      releaseDate: defaultMovieProps?.releaseDate,
      grade: defaultMovieProps?.grade,
      fetchCategories: categories,
    }),
    [categories, defaultMovieProps]
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<MovieFormSchema>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const imagePath =
      defaultMovieProps?.imagePath &&
      defaultMovieProps.imagePath.split("/").pop();
    reset(defaultValues);
    setPosterName(imagePath || null);
  }, [defaultValues, defaultMovieProps?.imagePath, reset]);

  return (
    <>
      {fetchLoading ? (
        <FormSkeleton inputsCount={7} />
      ) : (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={loading}
            inputOptions={register("title")}
            error={errors["title"]?.message}
            label="Title"
          />
          <Input
            multiline
            rows={3}
            disabled={loading}
            inputOptions={register("description")}
            error={errors["description"]?.message}
            label="Description"
          />
          <Input
            disabled={loading}
            type="number"
            inputOptions={register("duration")}
            error={errors["duration"]?.message}
            label="Duration (min)"
          />
          <Controller
            name="grade"
            control={control}
            render={({ field }) => (
              <FormControl>
                <Box
                  sx={{
                    width: 200,
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ mr: 2, color: "rgba(0, 0, 0, 0.6)" }}>Grade</Box>
                  <Rating
                    precision={0.5}
                    size="large"
                    value={Number(field.value)}
                    onChange={field.onChange}
                    disabled={loading}
                  />
                </Box>
                {errors["grade"] && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors["grade"]?.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="categories"
            control={control}
            render={({ field }) => (
              <FormControl>
                <InputLabel id="select-categories">Categories</InputLabel>
                <Select
                  labelId="select-categories"
                  disabled={loading}
                  color="secondary"
                  multiple
                  input={<OutlinedInput color="secondary" label="Categories" />}
                  MenuProps={{
                    PaperProps: { sx: { maxHeight: "200px" } },
                  }}
                  renderValue={(selected: string[]) => selected.join(", ")}
                  onChange={field.onChange}
                  value={field.value || []}
                >
                  {fetchCategoriesLoading
                    ? Array.from(Array(3), (_, index) => (
                        <MenuItem key={index}>
                          <StyledSkeleton />
                        </MenuItem>
                      ))
                    : categories.map((category) => (
                        <MenuItem key={category._id} value={category.name}>
                          <Checkbox
                            color="secondary"
                            checked={field.value.indexOf(category.name) > -1}
                          />
                          <ListItemText primary={category.name} />
                        </MenuItem>
                      ))}
                </Select>
                {errors["categories"] && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors["categories"]?.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="releaseDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Release date"
                  inputFormat="MM/DD/YYYY"
                  disabled={loading}
                  openTo="year"
                  views={["year", "month", "day"]}
                  PopperProps={{
                    sx: {
                      "& .Mui-selected": { bgcolor: "#e05326 !important" },
                      "& .Mui-selected:hover": {
                        bgcolor: "#d14314 !important",
                      },
                    },
                  }}
                  InputProps={{
                    sx: { "& .MuiSvgIcon-root": { color: "secondary.main" } },
                  }}
                  {...field}
                  value={field.value || null}
                  renderInput={(params) => (
                    <TextField
                      color="secondary"
                      {...params}
                      error={Boolean(errors["releaseDate"])}
                      helperText={errors["releaseDate"]?.message}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
          <FormControl>
            <Button
              variant="contained"
              disabled={loading}
              color={errors["imagePath"] ? "error" : "secondary"}
              component="label"
              startIcon={<ImageIcon />}
            >
              Upload poster
              <input
                hidden
                accept="image/*"
                type="file"
                {...register("imagePath", {
                  onChange: (event) =>
                    setPosterName(event.target.files[0]?.name || null),
                })}
              />
            </Button>
            {errors["imagePath"] && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors["imagePath"].message}
              </FormHelperText>
            )}
            {posterName && <FormHelperText>{posterName}</FormHelperText>}
          </FormControl>
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
              color="secondary"
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
