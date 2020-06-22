import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class FixAppointmentTypesEnums1589654874043
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'type');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enumName: 'appointments_type',
        enum: ['HAIR_CARE', 'HAIR_WASHING', 'CLASSIC_SHAVING'],
        default: `'HAIR_CARE'`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enum: ['Hair Care', 'Hair Washing', 'Classic Shaving'],
        default: `'Hair Care'`,
      }),
    );
  }
}
