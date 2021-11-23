import { container } from "tsyringe";

import "reflect-metadata";

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/repositories/UsersRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/category/CategoriesRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/category/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/specification/ISpecificationsRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/specification/SpecificationRepository";

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpecificationRepository", SpecificationRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
