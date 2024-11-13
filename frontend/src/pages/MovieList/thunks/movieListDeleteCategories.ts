import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCategory } from "api/categories";
import { toast } from "react-toastify";

const DELETE_CATEGORY_NAME = "DELETE_CATEGORY";

export const deleteCategoryStart = createAsyncThunk<void, string>(
  DELETE_CATEGORY_NAME,
  async (categoryId: string, { rejectWithValue }) => {
    try {
      await deleteCategory(categoryId);
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error(error as string);
      return rejectWithValue({ error });
    }
  }
);
