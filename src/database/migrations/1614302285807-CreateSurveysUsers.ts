import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysUsers1614302285807 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "surveys_users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "survey_id",
            type: "uuid",
          },
          {
            name: "value",
            type: "integer",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "Timestamp",
            default: "now()",
          }
        ],
        foreignKeys: [
          {
            name: "fk_user",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "fk_survey",
            referencedTableName: "surveys",
            referencedColumnNames: ["id"],
            columnNames: ["survey_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("surveys_users");
  }
}
