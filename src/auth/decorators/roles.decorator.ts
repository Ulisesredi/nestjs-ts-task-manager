import { ROLE } from "@/Constants";
import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "src/constants/key-decorators";
import { RoleKey } from "types/utils";

export const RoleAccess = (...roles: Array<RoleKey>) => SetMetadata(ROLES_KEY, roles);
