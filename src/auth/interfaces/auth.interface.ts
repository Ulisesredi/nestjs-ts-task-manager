import { ROLE } from "@/Constants";

export interface PayloadToken {
  sub: string;
  role: ROLE;
}

export interface AuthBody {
  username: string;
  password: string;
}
