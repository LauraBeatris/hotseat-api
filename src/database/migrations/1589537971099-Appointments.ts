import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class Appointments1589537971099 implements MigrationInterface {
  name = 'Appointments1589537971099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('appointments', [
      new TableColumn({
        name: 'created_at',
        type: 'date',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'date',
        default: 'now()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('appointments', [
      new TableColumn({
        name: 'created_at',
        type: 'date',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'date',
        default: 'now()',
      }),
    ]);
  }
}
