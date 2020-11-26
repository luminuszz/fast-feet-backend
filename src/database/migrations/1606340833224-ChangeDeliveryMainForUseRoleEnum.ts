import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeDeliveryMainForUseRoleEnum1606340833224 implements MigrationInterface {
    name = 'ChangeDeliveryMainForUseRoleEnum1606340833224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "deliveryman" TO "role"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "users_role_enum" NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role" TO "deliveryman"`);
    }

}
