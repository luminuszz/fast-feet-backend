import {MigrationInterface, QueryRunner} from "typeorm";

export class LinkUserToDelivryName1606775844684 implements MigrationInterface {
    name = 'LinkUserToDelivryName1606775844684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_f509ac1b8a4c230d6c685372609"`);
        await queryRunner.query(`ALTER TABLE "deliveries" RENAME COLUMN "deliverymanId" TO "deliveryman_id"`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_8508bc8e9e19065ead8b55f91b4" FOREIGN KEY ("deliveryman_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_8508bc8e9e19065ead8b55f91b4"`);
        await queryRunner.query(`ALTER TABLE "deliveries" RENAME COLUMN "deliveryman_id" TO "deliverymanId"`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_f509ac1b8a4c230d6c685372609" FOREIGN KEY ("deliverymanId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
