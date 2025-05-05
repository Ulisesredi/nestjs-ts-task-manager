import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { UserDTO } from "../dto/user.dto";
import { ErrorHandler } from "src/utils/error.handler";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  public async createUser(dataset: UserDTO): Promise<UserEntity> {
    try {
      return await this.userRepository.save(dataset);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw ErrorHandler.createSignatureError(error.message);
    }
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user)
        throw new ErrorHandler({
          type: "NOT_FOUND",
          message: `Couldn't find user with id: ${id}`
        });
      return user;
    } catch (error) {
      throw ErrorHandler.createSignatureError(error.message);
    }
  }

  public async updateUser(id: string, dataset: Partial<UserDTO>): Promise<UpdateResult | null> {
    try {
      const result = await this.userRepository.update(id, dataset);
      if (!result.affected) {
        throw new ErrorHandler({
          type: "NOT_FOUND",
          message: `Couldn't update user with id: ${id}`
        });
      }

      return result;
    } catch (error) {
      throw ErrorHandler.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | null> {
    try {
      const user = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorHandler({
          type: "NOT_FOUND",
          message: `Couldn't delete user with id: ${id}`
        });
      }
      return user;
    } catch (error) {
      throw ErrorHandler.createSignatureError(error.message);
    }
  }
}
