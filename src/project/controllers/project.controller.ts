import { Controller, Post, Get, Patch, Delete, Body, Param } from "@nestjs/common";
import { ProjectService } from "../sevices/project.service";
import { ProjectDTO } from "../dto/project.dto";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  public async registerProject(@Body() body: ProjectDTO) {
    return await this.projectService.createProject(body);
  }

  @Get()
  public async listProjects() {
    return await this.projectService.getProjects();
  }

  @Get(":id")
  public async getProject(@Param("id") id: string) {
    return await this.projectService.getProjectById(id);
  }

  @Patch(":id")
  public async updateProject(@Param("id") id: string, @Body() body: Partial<ProjectDTO>) {
    return await this.projectService.updateProject(id, body);
  }

  @Delete(":id")
  public async deleteProject(@Param("id") id: string) {
    return await this.projectService.deleteProject(id);
  }
}
