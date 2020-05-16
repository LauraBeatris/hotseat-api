import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateDateColumnsToTimestamp1589645353184
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('appointments', [
      {
        oldColumn: new TableColumn({
          name: 'created_at',
          type: 'date',
          default: 'now()',
        }),
        newColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'updated_at',
          type: 'date',
          default: 'now()',
        }),
        newColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('appointments', [
      {
        oldColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        }),
        newColumn: new TableColumn({
          name: 'created_at',
          type: 'date',
          default: 'now()',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        }),
        newColumn: new TableColumn({
          name: 'updated_at',
          type: 'date',
          default: 'now()',
        }),
      },
    ]);
  }
}
