import { AppError } from "@src/shared/errors/AppError";

import { CarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepository: CarRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(carRepository);
  });

  it("It should be possible create a new car", async () => {
    const payload = {
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
      available: true,
    };

    const car = await createCarUseCase.execute(payload);
    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with a existent license plate", async () => {
    const payload = {
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
      available: true,
    };

    await createCarUseCase.execute(payload);

    expect(async () => {
      await createCarUseCase.execute(payload);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with a availability true by default", async () => {
    const payload = {
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      available: true,
      category_id: "category",
    };

    const car = await createCarUseCase.execute(payload);

    expect(car.available).toBe(true);
  });
});
