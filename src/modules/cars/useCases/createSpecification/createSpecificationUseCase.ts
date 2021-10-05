import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/specification/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const exists = await this.specificationRepository.findByName(name);

    if (exists) throw new Error("This specification already exists");

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
