import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthBody } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";
import { AuthDTO } from "../dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() { username, password }: AuthDTO) {
    const validUser = await this.authService.validateUser(username, password);

    if (!validUser) throw new UnauthorizedException(`Wrong username or password.`);

    const jwt = await this.authService.generateJWT(validUser);

    return jwt;
  }
}
