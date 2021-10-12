import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.trategy';
import { UserSchema } from 'src/users/schemas/user.schema';
import { TriviaSchema } from './schemas/trivia.schema';
import { TriviaController } from './trivia.controller';
import { TriviaService } from './trivia.service';

@Module({
  imports: [
    AuthModule,
    PassportModule,
    MongooseModule.forFeature([
      { name: 'Trivia', schema: TriviaSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [TriviaController],
  providers: [TriviaService, JwtStrategy],
})
export class TriviaModule {}
