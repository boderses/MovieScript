import { Document, Types, ObjectId } from "mongoose";
import { z as zod } from "zod";
import { UploadedFile } from "express-fileupload";
import { Readable } from "stream";

import {
  CategoryUserInputSchema,
  MovieSchema,
  CategoryOptionalSchema,
  MovieOptionalSchema,
  UserLoginSchema,
  UserRegisterSchema,
} from "../validation";

export type UserId = {
  userId: Types.ObjectId;
};

export type CategoryUserInput = zod.infer<typeof CategoryUserInputSchema>;
export type Movie = zod.infer<typeof MovieSchema> & UserId;
export type MovieUserInput = zod.infer<typeof MovieSchema>;
export type CategoryInDatabase = CategoryUserInput & UserId;
export type CategoryUpdate = zod.infer<typeof CategoryOptionalSchema>;
export type MovieUpdate = zod.infer<typeof MovieOptionalSchema>;
export type UserLogin = zod.infer<typeof UserLoginSchema>;
export type UserRegister = zod.infer<typeof UserRegisterSchema>;

enum SortOptions {
  asc = "asc",
  desc = "desc",
}

export type MoviesQuery = {
  search?: string;
  categories?: string;
  limit?: string;
  sort?: SortOptions;
};

export type User = {
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
};

export type MovieFile = {
  _id: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  metadata: {
    userId: Types.ObjectId;
    dirName: string;
  };
};

export type CustomFile = UploadedFile & {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  path: string;
};

export type Context = {
  token?: string;
  user?: Document<unknown, any, User> & User;
};
