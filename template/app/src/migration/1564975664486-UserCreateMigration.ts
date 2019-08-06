import { MigrationInterface, QueryRunner, Table } from "zonetk-core";

export class UserCreateMigration1564975664486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "firstName",
                    type: "varchar(32)",
                },
                {
                    name: "lastName",
                    type: "varchar(32)",
                },
                {
                    name: "age",
                    type: "int",
                }
            ]
        });
        console.log(table instanceof Table);
        await queryRunner.createTable(table, true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("users");
    }

}
