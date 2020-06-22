import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeTypeOfAppointmentIdColumn1589647075905
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'id',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
        isPrimary: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'id',
      new TableColumn({
        name: 'id',
        type: 'varchar',
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
        isPrimary: true,
      }),
    );
  }
}
