import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { PartialUserDTO, UserDTO } from "../dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  public async createUser(dataset: UserDTO): Promise<UserEntity> {
    try {
      return await this.userRepository.save(dataset);
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  public async getUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error("Error retrieving users: " + error.message);
    }
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error("Error retrieving user by id: " + error.message);
    }
  }

  public async updateUser(id: string, dataset: PartialUserDTO): Promise<UpdateResult | null> {
    try {
      const user = await this.userRepository.update(id, dataset);
      if (user.affected === 0) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | null> {
    try {
      const user = await this.userRepository.delete(id);
      if (user.affected === 0) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}
