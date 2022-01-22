import { ICreateCarDto } from "../../dtos/ICreateCarDto";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarRepository } from "../ICarRepository";

export class CarRepositoryInMemory implements ICarRepository {
  private cars: Car[] = [];

  async create(payload: ICreateCarDto): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      ...payload,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicencePlate(licensePlate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_plate === licensePlate);
    return car;
  }
}
