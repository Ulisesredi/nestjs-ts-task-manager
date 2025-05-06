import { UserProjectEntity } from "@/User/entities/userProject.entity";
import { BaseEntity } from "src/config/base.entity";
import { IProject } from "src/interfaces/project.interface";

import { Column, Entity, OneToMany } from "typeorm";

@Entity("project")
export class ProjectEntity extends BaseEntity implements IProject {
  @Column()
  name: string;
  @Column()
  description: string;

  @OneToMany(() => UserProjectEntity, (userProject) => userProject.project)
  usersIncluded: UserProjectEntity[];
}
