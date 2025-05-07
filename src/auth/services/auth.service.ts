import { UserEntity } from "@/User/entities/user.entity";
import { UserService } from "@/User/services/user.service";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { PayloadToken } from "../interfaces/auth.interface";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser(username: string, password: string) {
    const authUser: UserEntity | null = await this.userService.findByUsernameOrEmail(username);

    if (authUser) {
      const match = await bcrypt.compare(password, authUser.password);
      if (match) return authUser;
    }

    return null;
  }

  public signJWT({ payload, secret }: { payload: jwt.JwtPayload; secret: string }) {
    return jwt.sign(payload, secret, { expiresIn: "4h" });
  }

  public async generateJWT(user: UserEntity): Promise<any> {
    const getUser = await this.userService.getUserById(user.id);

    if (!getUser) {
      throw new Error(`Couldn't generate JWT payload. User with id: "${user.id}" not found.`);
    }

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id
    };

    return {
      accessToken: this.signJWT({ payload, secret: process.env.JWT_SECRET }),
      user
    };
  }
}
