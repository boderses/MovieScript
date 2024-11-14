import { Request, Response } from "express";
import { Service } from "typedi";
import CategoryService from "../services/category.service";
import { CategoryUserInputSchema } from "../validation";
import BaseController from "./base.controller";

@Service()
class CategoryController extends BaseController {
  constructor(private categoryService: CategoryService) {
    super();
  }

  async createCategory(request: Request, response: Response) {
    try {
      const validCategory = CategoryUserInputSchema.parse(request.body);
      if (request.context && request.context.user) {
        const category = await this.categoryService.createCategory(
          validCategory,
          request.context.user
        );
        return this.formatSuccessResponse(response, category);
      }
    } catch (error) {
      this.handleError(response, error);
    }
  }
  async getCategories(request: Request, response: Response) {
    try {
      if (request.context && request.context.user) {
        const categories = await this.categoryService.getCategories(
          request.context.user
        );
        return this.formatSuccessResponse(response, categories);
      }
    } catch (error) {
      this.handleError(response, error);
    }
  }
  async deleteCategory(request: Request, response: Response) {
    try {
      const { categoryId } = request.params;
      if (request.context && request.context.user) {
        const result = await this.categoryService.deleteCategoryWithMovies(
          categoryId,
          request.context.user
        );
        if (result) {
          return this.formatSuccessResponse(response, {
            message: "Category and related movies deleted successfully",
          });
        } else {
          return this.formatErrorResponse(response, "Category not found");
        }
      }
    } catch (error) {
      this.handleError(response, error);
    }
  }
}

export default CategoryController;
