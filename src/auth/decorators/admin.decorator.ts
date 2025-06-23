import { ROLE } from "@/Constants";
import { SetMetadata } from "@nestjs/common";
import { ADMIN_KEY } from "src/constants/key-decorators";

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLE.Admin);
