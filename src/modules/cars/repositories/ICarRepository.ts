import { ICreateCarDto } from "../dtos/ICreateCarDto";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarRepository {
  create(payload: ICreateCarDto): Promise<Car>;
  findByLicencePlate(licensePlate: string): Promise<Car>;
}
