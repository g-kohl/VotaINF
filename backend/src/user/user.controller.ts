import { Controller, HttpCode, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} 
  
  @Post() 
  async create(@Body() userData: any) {
    console.log(`[USER-CONTROLLER] Received creation request for user: ${userData.name}`);

    // faz a chamada do user.service.ts
    const newUser = await this.userService.create(userData); 
    
    return newUser;
    
  }

  @Post('login') // This decorator creates the final path: /user/login
  @HttpCode(200) // Sets the HTTP status code to 200 OK on success
  async login(@Body() credentials: { email: string, password: string }) {
    console.log(`[USER-CONTROLLER] Received login request for email: ${credentials.email}`);

    // Calls the service to find the user and compare the password hash
    const user = await this.userService.validateUser(
      credentials.email, 
      credentials.password
    );

    if (!user) {
      // If validation fails (user not found or passwords don't match), throw an error
      throw new UnauthorizedException('Invalid credentials.');
    }
    
    // On success, returns the user object, which the frontend uses for navigation
    return user; 
  }
}