import { ROLE } from "@/Constants";
import { BaseEntity } from "src/config/base.entity";
import { IUser } from "src/interfaces/user.interface";
import { Column, Entity, OneToMany } from "typeorm";
import { UserProjectEntity } from "./userProject.entity";

@Entity("user")
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: "enum", enum: ROLE, default: ROLE.Basic })
  role: ROLE;

  @OneToMany(() => UserProjectEntity, (userProject) => userProject.project)
  projectsIncluded: UserProjectEntity[];
}
