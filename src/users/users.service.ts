import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // TODO: In the future winston or pino should be consider
  private readonly logger = new Logger(UsersService.name);

  constructor(
    // TODO: In more complicated app using repository app will be great, but in this scenario I prefer to use model directly in service
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async consumeUser(modelToAdd: Omit<UserEntity, 'id'>) {
    this.logger.setContext(this.consumeUser.name);

    try {
      await this.usersRepository.create(modelToAdd);

      this.logger.debug(`User created ${JSON.stringify(modelToAdd)}`);
    } catch (e) {
      this.logger.error('Could not consume user', e);
    }
  }

  getAllUsers() {
    return this.usersRepository.find();
  }
}
