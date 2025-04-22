import { BaseEntity } from "src/config/base.entity";
import { IProject } from "src/interfaces/project.interface";
import { IUser } from "src/interfaces/user.interface";
import { Column, Entity } from "typeorm";

@Entity("project")
export class ProjectEntity extends BaseEntity implements IProject {
  @Column()
  name: string;
  @Column()
  description: string;
}
