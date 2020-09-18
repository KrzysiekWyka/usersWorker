import { prop } from '@typegoose/typegoose';

export class UserEntity {
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  surname!: string;

  @prop({ required: true })
  address!: string;
}
