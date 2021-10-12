import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('forgot-password')
  async forgotPassword(@Body() { email }: { email: string }) {
    return await this.usersService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body(ValidationPipe)
    { password, token }: { password: string; token: string },
  ) {
    return await this.usersService.resetPassword(token, password);
  }
}
