import { ISpecificationsRepository } from "../repositories/specification/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const exists = this.specificationRepository.findByName(name);

    if (exists) throw new Error("This specificatio already exists");

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationService };
