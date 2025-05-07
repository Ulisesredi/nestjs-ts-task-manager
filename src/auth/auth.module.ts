import { Global, Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { UserService } from "@/User/services/user.service";
import { UserModule } from "@/User/user.module";

@Global()
@Module({
  imports: [UserModule],
  providers: [AuthService, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
