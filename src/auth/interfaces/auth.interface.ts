import { ROLE } from "@/Constants";

export interface PayloadToken {
  sub: string;
  role: ROLE;
}

export interface AuthBody {
  username: string;
  password: string;
}
export interface AuthTokenResult {
  sub: string;
  role: string;
  iat: string;
  exp: string;
}
export interface IUseToken {
  sub: string;
  role: string;
  isExpired: boolean;
}
