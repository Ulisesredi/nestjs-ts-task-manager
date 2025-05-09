import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { JoinUserIntoProjectDTO, UserDTO } from "../dto/user.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { PublicAccess } from "src/auth/decorators/public.decorator";

@Controller("user")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async registerUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @Post("join-project")
  public async joinProject(@Body() body: JoinUserIntoProjectDTO) {
    return await this.userService.joinIntoProject(body);
  }

  @Get()
  @PublicAccess()
  public async listUsers() {
    return await this.userService.getUsers();
  }

  @Get("projects/:id")
  public async getUserWithProjects(@Param("id") id: string) {
    return this.userService.getUserWithProjects(id);
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
