import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from "src/constants/key-decorators";
import { RoleKey } from "types/utils";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();

    const roles = this.reflector.get<Array<RoleKey>>(ROLES_KEY, context.getHandler());

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const { roleUser } = req;

    if (roles === undefined) {
      //default role set to basic
      if (!admin) return true;
      //if admin and it matches the user role
      else if (admin && roleUser === admin) {
        return true;
      } else {
        //otherwise it's not allowed
        throw new UnauthorizedException("Admin credentials required.");
      }
    }

    const isAuth = roles.some((role) => role === roleUser);

    if (!isAuth) throw new UnauthorizedException("Missing role to perform this operation.");

    return true;
  }
}
