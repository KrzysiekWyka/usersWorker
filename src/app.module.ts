import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // TODO: Read connection string from config file
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().default(
          'mongodb://localhost:27017/users-worker',
        ),
        REDIS_HOST: Joi.string().default('localhost'),
        REDIS_PORT: Joi.number().default(6379),
      }),
    }),
    UsersModule,
  ],
})
export class AppModule {}
