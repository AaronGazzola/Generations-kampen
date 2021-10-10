import { UsersService } from '../users/users.service';
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserSeed {
  constructor(private readonly usersService: UsersService) {}

  @Command({
    command: 'create:user',
    describe: 'create a user',
  })
  async create() {
    await this.usersService.seedUser({
      email: 'nicklas@nangarra.com',
      password: process.env.USER_PASSWORD,
    });
  }
}
