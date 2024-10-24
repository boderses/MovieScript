type ID = {
  _id: string;
};

type UserId = {
  userId: string;
};

export type MovieDefault = {
  _id: string;
  title: string;
  description: string;
  releaseDate: Date;
  duration: number;
  grade: number;
};

export type MovieFormSchema = MovieDefault & {
  categories: string[];
  imagePath: FileList;
  fetchCategories: MovieCategory[];
};

export type MovieCategoryUserInput = {
  name: string;
};

export type MovieCategory = MovieCategoryUserInput & ID & UserId;

export type Movie = {
  title: string;
  description: string;
  categories: MovieCategory[];
  releaseDate: Date;
  imagePath: string;
  duration: number;
  grade: number;
} & ID;

export enum SortMoviesOptions {
  asc = "asc",
  desc = "desc",
}

export type MovieQueries = {
  search?: string | null;
  categories?: string | null;
  limit?: string | null;
  sort?: SortMoviesOptions | null;
};

export enum Position {
  static = "static",
  absolute = "absolute",
  relative = "relative",
  fixed = "fixed",
  sticky = "sticky",
}

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
};
