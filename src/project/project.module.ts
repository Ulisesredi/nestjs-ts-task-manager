import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectEntity } from "./entities/project.entity";
import { ProjectService } from "./sevices/project.service";
import { ProjectController } from "./controllers/project.controller";
import { UserProjectEntity } from "@/User/entities/userProject.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, UserProjectEntity])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
