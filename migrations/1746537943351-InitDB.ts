import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1746537943351 implements MigrationInterface {
    name = 'InitDB1746537943351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('BASIC', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "age" integer NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'BASIC', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_project_access_level_enum" AS ENUM('40', '50')`);
        await queryRunner.query(`CREATE TABLE "user_project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "access_level" "public"."user_project_access_level_enum" NOT NULL DEFAULT '40', "user_id" uuid, "project_id" uuid, CONSTRAINT "PK_72a40468c3924e43b934542e8e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_project" ADD CONSTRAINT "FK_dd66dc6a11849a786759c225537" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_project" ADD CONSTRAINT "FK_9f6abe80cbe92430eaa7a720c26" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_project" DROP CONSTRAINT "FK_9f6abe80cbe92430eaa7a720c26"`);
        await queryRunner.query(`ALTER TABLE "user_project" DROP CONSTRAINT "FK_dd66dc6a11849a786759c225537"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "user_project"`);
        await queryRunner.query(`DROP TYPE "public"."user_project_access_level_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
