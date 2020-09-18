import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersProcessor } from './users.processor';

@Module({
  imports: [
    TypegooseModule.forFeature([UserEntity]),
    // TODO: Read config values!!
    BullModule.registerQueue({
      name: 'users',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [UsersService, UsersProcessor],
  controllers: [UsersController],
})
export class UsersModule {}
