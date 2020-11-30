import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovenotNullToStartofDate1606779495096 implements MigrationInterface {
    name = 'RemovenotNullToStartofDate1606779495096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "start_date" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "deliveries"."start_date" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "deliveries"."start_date" IS NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "start_date" SET NOT NULL`);
    }

}
