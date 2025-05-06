import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectEntity } from "../entities/project.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ProjectDTO } from "../dto/project.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>
  ) {}

  public async createProject(dataset: ProjectDTO): Promise<ProjectEntity> {
    try {
      return await this.projectRepository.save(dataset);
    } catch (error) {
      throw new Error("Error creating project: " + error.message);
    }
  }

  public async getProjects(): Promise<ProjectEntity[]> {
    try {
      return await this.projectRepository.find();
    } catch (error) {
      throw new Error("Error retrieving projects: " + error.message);
    }
  }
  public async getProjectById(id: string): Promise<ProjectEntity | null> {
    try {
      return await this.projectRepository
        .createQueryBuilder("project")
        .where({ id })
        .leftJoinAndSelect("project.usersIncluded", "usersIncluded")
        .leftJoinAndSelect("usersIncluded.user", "user")
        .getOne();
    } catch (error) {
      throw new Error("Error retrieving project by id: " + error.message);
    }
  }
  public async updateProject(
    id: string,
    dataset: Partial<ProjectDTO>
  ): Promise<UpdateResult | null> {
    try {
      const result = await this.projectRepository.update(id, dataset);
      if (!result.affected) return null;
      return result;
    } catch (error) {
      throw new Error("Error updating project: " + error.message);
    }
  }
  public async deleteProject(id: string): Promise<DeleteResult | null> {
    try {
      const result = await this.projectRepository.delete(id);
      if (!result.affected) return null;
      return result;
    } catch (error) {
      throw new Error("Error deleting project: " + error.message);
    }
  }
}
