import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovenotNulltoSignture1606779632606 implements MigrationInterface {
    name = 'RemovenotNulltoSignture1606779632606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "signatureId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "deliveries"."signatureId" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "deliveries"."signatureId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "signatureId" SET NOT NULL`);
    }

}
