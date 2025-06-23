import { UserService } from "@/User/services/user.service";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { PUBLIC_KEY } from "src/constants/key-decorators";
import { useToken } from "src/utils/use.token";
import { IUseToken } from "../interfaces/auth.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers["token"];

    if (Array.isArray(token)) throw new UnauthorizedException("Invalid token.");
    if (!token) throw new UnauthorizedException("Missing token.");

    const manageToken: IUseToken | string = useToken(token);
    if (typeof manageToken === "string") throw new UnauthorizedException(manageToken);

    if (manageToken.isExpired) throw new UnauthorizedException("Token is expired.");

    const { sub } = manageToken;
    const user = await this.userService.getUserById(sub);

    if (!user) throw new UnauthorizedException("Invalid user.");

    req.idUser = user.id;
    req.roleUser = user.role;

    return true;
  }
}
