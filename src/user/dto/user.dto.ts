import { ACCESS_LEVEL, ROLE } from "@/Constants";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { UserEntity } from "../entities/user.entity";
import { ProjectEntity } from "src/project/entities/project.entity";

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEnum(ROLE)
  role: ROLE;
}

export class JoinUserIntoProjectDTO {
  @IsNotEmpty()
  @IsUUID()
  user: UserEntity;

  @IsNotEmpty()
  @IsUUID()
  project: ProjectEntity;

  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accessLevel: ACCESS_LEVEL;
}
