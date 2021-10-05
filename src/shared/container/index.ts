import { container } from "tsyringe";

import "reflect-metadata";

import { CategoriesRepository } from "../../modules/cars/repositories/category/CategoriesRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/category/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/specification/ISpecificationsRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/specification/SpecificationRepository";

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpecificationRepository", SpecificationRepository);
