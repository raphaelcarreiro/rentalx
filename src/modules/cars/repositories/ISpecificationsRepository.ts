import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecifiationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create(specification: ICreateSpecifiationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecifiationDTO };
