import bcrypt from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(
    @inject("UsersRepository")
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  async execute(data: ICreateUsersDTO): Promise<void> {
    const alreadyExists = await this.usersRepository.findByEmail(data.email);

    if (alreadyExists) throw new AppError("User already exists");

    const hash = bcrypt.hashSync(data.password, 8);
    data.password = hash;

    await this.usersRepository.create(data);
  }
}

export { CreateUserUseCase };
