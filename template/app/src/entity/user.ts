import { Entity, PrimaryGeneratedColumn, Column } from "zonetk-core";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
