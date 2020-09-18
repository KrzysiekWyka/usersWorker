import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  surname!: string;

  @Column({ nullable: false })
  address!: string;
}
