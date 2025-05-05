import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserDTO } from "../dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async registerUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @Get()
  public async listUsers() {
    return await this.userService.getUsers();
  }

  @Get(":id")
  public async getUser(@Param("id") id: string) {
    return await this.userService.getUserById(id);
  }

  @Patch(":id")
  public async updateUser(@Param("id") id: string, @Body() body: Partial<UserDTO>) {
    return await this.userService.updateUser(id, body);
  }

  @Delete(":id")
  public async deleteUser(@Param("id") id: string) {
    return await this.userService.deleteUser(id);
  }
}
