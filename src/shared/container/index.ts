import { CarRepository } from "@src/modules/cars/infra/typeorm/repositories/CarRepository";
import { SpecificationRepository } from "@src/modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarRepository } from "@src/modules/cars/repositories/ICarRepository";
import { container } from "tsyringe";

import "reflect-metadata";

import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpecificationRepository", SpecificationRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
