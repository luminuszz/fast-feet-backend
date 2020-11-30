import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovenotNullToEndofDate1606779531809 implements MigrationInterface {
    name = 'RemovenotNullToEndofDate1606779531809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "end_date" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "deliveries"."end_date" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "deliveries"."end_date" IS NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "end_date" SET NOT NULL`);
    }

}
