import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarsTable1640892301981 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "daily_rate",
            type: "numeric",
          },
          {
            name: "available",
            type: "boolean",
            default: true,
          },
          {
            name: "license_plate",
            type: "varchar",
          },
          {
            name: "fine_amount",
            type: "numeric",
          },
          {
            name: "brand",
            type: "varchar",
          },
          {
            name: "category_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "cars_category_id_foreign",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["category_id"],
            onDelete: "set null",
            onUpdate: "set null",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("cars");
  }
}
