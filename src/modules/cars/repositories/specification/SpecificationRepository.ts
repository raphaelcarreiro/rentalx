import { Specification } from "../../model/Specification";
import { ISpecificationsRepository, ICreateSpecifiationDTO } from "./ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANTE: SpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANTE) return new SpecificationRepository();

    return SpecificationRepository.INSTANTE;
  }

  create({ name, description }: ICreateSpecifiationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification | null {
    const speficiation = this.specifications.find(specication => specication.name === name);

    if (!speficiation) return null;

    return speficiation;
  }

  list(): Specification[] {
    return this.specifications;
  }
}

export { SpecificationRepository };
