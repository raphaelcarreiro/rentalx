import { AppError } from "@src/shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeorm/entities/Car";
import { ICarRepository } from "../../repositories/ICarRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  available: boolean;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
  ) {
    //
  }

  async execute(payload: IRequest): Promise<Car> {
    await this.checkIfCarAlreadyExists(payload.license_plate);
    const car = await this.carRepository.create(payload);
    return car;
  }

  private async checkIfCarAlreadyExists(licensePlate: string) {
    const car = await this.carRepository.findByLicencePlate(licensePlate);

    if (car) {
      throw new AppError("Car already exists", 400);
    }
  }
}
