import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersProcessor } from './users.processor';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypegooseModule.forFeature([UserEntity]),
    // TODO: Read config values!!
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'users',
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
        },
      }),
    }),
  ],
  providers: [UsersService, UsersProcessor],
  controllers: [UsersController],
})
export class UsersModule {}
