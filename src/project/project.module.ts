import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectEntity } from "./entities/project.entity";
import { ProjectService } from "./sevices/project.service";
import { ProjectController } from "./controllers/project.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
