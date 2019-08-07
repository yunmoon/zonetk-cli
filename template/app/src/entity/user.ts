import { Entity, PrimaryGeneratedColumn, Column } from "zonetk-core";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 32 })
    firstName: string;

    @Column({ type: "varchar", length: 32 })
    lastName: string;

    @Column()
    age: number;

}
