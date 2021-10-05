import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository, ICreateSpecifiationDTO } from "./ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  public constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecifiationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const speficiation = await this.repository.findOne({ name });

    return speficiation;
  }
}

export { SpecificationRepository };
