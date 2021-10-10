import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { UsersModule } from 'src/users/users.module';

import { UserSeed } from './user.seed';

@Module({
  imports: [CommandModule, UsersModule],
  providers: [UserSeed],
  exports: [UserSeed],
})
export class SeedsModule {}
