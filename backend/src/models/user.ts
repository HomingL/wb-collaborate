import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Field, ObjectType, ID } from 'type-graphql';
import { Whiteboard } from './whiteboard';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  @OneToMany(() => Whiteboard, (whiteboard) => whiteboard.user)
  @Field(() => [Whiteboard], { nullable: true })
  whiteboards: Whiteboard[];
}
