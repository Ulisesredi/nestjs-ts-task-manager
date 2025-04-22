import { BaseEntity } from "src/config/base.entity";
import { IUser } from "src/interfaces/user.interface";
import { Column, Entity } from "typeorm";

@Entity("user")
export class UserEntity extends BaseEntity implements IUser {
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  age: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  username: string;
  @Column()
  role: string;
}
