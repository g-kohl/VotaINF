import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.userService.validateUser(body.username, body.password);

    if(!user) {
      throw new UnauthorizedException("Credenciais Inválidas");
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email
    };
  }
}
