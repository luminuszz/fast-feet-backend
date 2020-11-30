import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsigntureToDeliverts1606779352642 implements MigrationInterface {
    name = 'AddsigntureToDeliverts1606779352642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_f509ac1b8a4c230d6c685372609"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP COLUMN "deliverymanId"`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD "signatureId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD "deliveryman_id" uuid`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_8508bc8e9e19065ead8b55f91b4" FOREIGN KEY ("deliveryman_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_8508bc8e9e19065ead8b55f91b4"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP COLUMN "deliveryman_id"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP COLUMN "signatureId"`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD "deliverymanId" uuid`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_f509ac1b8a4c230d6c685372609" FOREIGN KEY ("deliverymanId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
