import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProjectDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
