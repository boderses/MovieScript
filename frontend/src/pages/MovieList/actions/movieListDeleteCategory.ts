import { createAction, PayloadAction } from "@reduxjs/toolkit";

export const categoryDeleteInProgressAction = createAction("movieList/categoryDeleteInProgress");
export const categoryDeleteSuccessAction = createAction<{ categoryId: string }>("movieList/categoryDeleteSuccess");
export const categoryDeleteErrorAction = createAction<{ error: string }>("movieList/categoryDeleteError");
