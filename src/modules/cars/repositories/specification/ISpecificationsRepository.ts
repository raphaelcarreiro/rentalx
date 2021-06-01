import { Specification } from "../../model/Specification";

interface ICreateSpecifiationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create(specification: ICreateSpecifiationDTO): void;
  findByName(name: string): Specification | null;
  list(): Specification[];
}

export { ISpecificationsRepository, ICreateSpecifiationDTO };
