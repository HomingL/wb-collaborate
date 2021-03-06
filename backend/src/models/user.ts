import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

import { Field, ObjectType, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
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
}
