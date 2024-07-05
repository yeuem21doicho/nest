import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipBrandAndProduct1720159922958 implements MigrationInterface {
    name = 'AddRelationshipBrandAndProduct1720159922958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brand" ("isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "createdUserId" uuid, "categoryId" uuid, "brandId" uuid, CONSTRAINT "REL_70962d60ddff098ed14045974a" UNIQUE ("createdUserId"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "createdUserId" uuid, CONSTRAINT "REL_ffed5bc63468db73642ee53175" UNIQUE ("createdUserId"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(32) NOT NULL, "userName" character varying(20) NOT NULL, "roles" text NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand_categories_category" ("brandId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_5866eac1431a89a2cfb08d895ef" PRIMARY KEY ("brandId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc4ac81ce81ba06b488ba5c3c6" ON "brand_categories_category" ("brandId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fa8d059928d8498f824d3f91ca" ON "brand_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roles" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_70962d60ddff098ed14045974a9" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_ffed5bc63468db73642ee531751" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand_categories_category" ADD CONSTRAINT "FK_bc4ac81ce81ba06b488ba5c3c62" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "brand_categories_category" ADD CONSTRAINT "FK_fa8d059928d8498f824d3f91cab" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand_categories_category" DROP CONSTRAINT "FK_fa8d059928d8498f824d3f91cab"`);
        await queryRunner.query(`ALTER TABLE "brand_categories_category" DROP CONSTRAINT "FK_bc4ac81ce81ba06b488ba5c3c62"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_ffed5bc63468db73642ee531751"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_70962d60ddff098ed14045974a9"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roles" text NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa8d059928d8498f824d3f91ca"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc4ac81ce81ba06b488ba5c3c6"`);
        await queryRunner.query(`DROP TABLE "brand_categories_category"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "brand"`);
    }

}
