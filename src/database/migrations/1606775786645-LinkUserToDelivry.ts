import { MigrationInterface, QueryRunner } from 'typeorm'

export class LinkUserToDelivry1606775786645 implements MigrationInterface {
  name = 'LinkUserToDelivry1606775786645'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "deliveries" ADD "deliverymanId" uuid`)
    await queryRunner.query(
      `ALTER TABLE "deliveries" ADD CONSTRAINT "FK_f509ac1b8a4c230d6c685372609" FOREIGN KEY ("deliverymanId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deliveries" DROP CONSTRAINT "FK_f509ac1b8a4c230d6c685372609"`
    )
    await queryRunner.query(
      `ALTER TABLE "deliveries" DROP COLUMN "deliverymanId"`
    )
  }
}
