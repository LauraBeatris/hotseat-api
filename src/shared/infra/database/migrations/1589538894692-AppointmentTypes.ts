import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AppointmentTypes1589538894692
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enum: ['Hair Care', 'Hair Washing', 'Classic Shaving'],
        default: "'Hair Care'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'appointments',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
