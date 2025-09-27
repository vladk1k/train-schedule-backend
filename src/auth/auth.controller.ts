import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() authDto: AuthDto) {
    const existingUser = await this.usersService.findOne(authDto.username);
    if (existingUser) {
      throw new ConflictException(
        'Username already exists. Please choose another one.',
      );
    }

    const user = await this.usersService.create(authDto);
    return this.authService.login(user);
  }

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const user = await this.authService.validateUser(
      authDto.username,
      authDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Wrong username or password');
    }
    return this.authService.login(user);
  }
  @Delete('delete')
  async delete(@Body() id: number) {
    await this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }
  @Get('user')
  async getUser(@Body() id: number) {
    const user = await this.usersService.findOne(id.toString());
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { id: user.id, username: user.username };
  }
}
