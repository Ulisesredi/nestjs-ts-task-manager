import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserProjectEntity } from "./entities/userProject.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserProjectEntity])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
