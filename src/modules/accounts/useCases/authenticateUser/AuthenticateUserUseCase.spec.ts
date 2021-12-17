import { AppError } from "@src/errors/AppError";

import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUsersDTO = {
      driver_licence: "123",
      email: "user@test.com.br",
      password: "123456",
      name: "Raphael M Carreiro",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({ email: "user@test.com.br", password: "123456" });
    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@teste.com.br",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUsersDTO = {
      driver_licence: "123",
      email: "user@test.com.br",
      password: "123456",
      name: "Raphael M Carreiro",
    };

    await createUserUseCase.execute(user);

    await expect(async () => {
      await authenticateUserUseCase.execute({ email: "user@test.com.br", password: "12345" });
    }).rejects.toBeInstanceOf(AppError);
  });
});
