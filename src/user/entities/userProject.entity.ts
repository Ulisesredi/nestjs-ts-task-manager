import { ACCESS_LEVEL } from "@/Constants";
import { BaseEntity } from "src/config/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { ProjectEntity } from "src/project/entities/project.entity";

@Entity("user_project")
// The UserProjectEntity class represents the many-to-many relationship between users and projects.
export class UserProjectEntity extends BaseEntity {
  @Column({ type: "enum", enum: ACCESS_LEVEL, default: ACCESS_LEVEL.Maintainer })
  accessLevel: ACCESS_LEVEL;

  @ManyToOne(() => UserEntity, (user) => user.projectsIncluded)
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.usersIncluded)
  project: ProjectEntity;
}
