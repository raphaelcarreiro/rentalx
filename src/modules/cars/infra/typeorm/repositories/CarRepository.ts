import { ICreateCarDto } from "@src/modules/cars/dtos/ICreateCarDto";
import { ICarRepository } from "@src/modules/cars/repositories/ICarRepository";
import { getRepository, Repository } from "typeorm";

import { Car } from "../entities/Car";

export class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(payload: ICreateCarDto): Promise<Car> {
    const car = this.repository.create(payload);

    await this.repository.save(car);

    return car;
  }

  async findByLicencePlate(licensePlate: string): Promise<Car> {
    return await this.repository.findOne({
      where: {
        license_plate: licensePlate,
      },
    });
  }
}
