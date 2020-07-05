import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddExpiresAtColumn1593913539547
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'recover_password_requests',
      new TableColumn({
        name: 'expires_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('recover_password_requests', 'expires_at');
  }
}
