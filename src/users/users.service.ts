import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserEntity } from './user.entity';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UsersService {
  // TODO: In the future winston or pino should be consider
  private readonly logger = new Logger(UsersService.name);

  constructor(
    // TODO: In more complicated app using repository app will be great, but in this scenario I prefer to use model directly in service
    @InjectModel(UserEntity)
    private readonly usersModel: ReturnModelType<typeof UserEntity>,
  ) {}

  async consumeUser(modelToAdd: UserEntity) {
    this.logger.setContext(this.consumeUser.name);

    try {
      await this.usersModel.create(modelToAdd);

      this.logger.debug(`User created ${JSON.stringify(modelToAdd)}`);
    } catch (e) {
      this.logger.error('Could not consume user', e);
    }
  }

  getAllUsers() {
    return this.usersModel
      .find()
      .sort({ name: -1, surname: -1 })
      .lean()
      .exec();
  }
}
