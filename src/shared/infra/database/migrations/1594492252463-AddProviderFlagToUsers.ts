import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddProviderFlagToUsers1594492252463
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'is_provider',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'users',
      new TableColumn({
        name: 'is_provider',
        type: 'boolean',
        default: false,
      }),
    );
  }
}
