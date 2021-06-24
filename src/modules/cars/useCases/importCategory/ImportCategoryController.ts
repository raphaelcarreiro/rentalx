import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {
    //
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const categories = await this.importCategoryUseCase.execute(file);
    return response.status(200).json(categories);
  }
}

export { ImportCategoryController };