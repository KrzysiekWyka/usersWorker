import { Process, Processor } from '@nestjs/bull';
import { UsersService } from './users.service';
import { Job } from 'bull';
import { UserEntity } from './user.entity';
import { Logger } from '@nestjs/common';

@Processor('users')
export class UsersProcessor {
  // TODO: In the future winston or pino should be consider
  private readonly logger = new Logger(UsersProcessor.name);

  constructor(private readonly usersService: UsersService) {}

  @Process()
  consume(job: Job<UserEntity>) {
    this.logger.setContext(this.consume.name);

    this.logger.debug(`Job: ${job.id} Payload: ${JSON.stringify(job.data)}`);

    return this.usersService.consumeUser(job.data);
  }
}
