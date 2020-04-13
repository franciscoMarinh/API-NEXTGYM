import {MigrationInterface, QueryRunner} from "typeorm";

export class users1586735579965 implements MigrationInterface {
    name = 'users1586735579965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`, undefined);
        await queryRunner.query(`CREATE SEQUENCE "user_id_seq" OWNED BY "user"."id"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq')`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`, undefined);
        await queryRunner.query(`DROP SEQUENCE "user_id_seq"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`, undefined);
    }

}
