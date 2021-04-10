import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Field, ObjectType, ID, InputType } from 'type-graphql';
import { Whiteboard } from './whiteboard';
import { IsEmail, Length, Matches } from 'class-validator';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

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

  @OneToMany(() => Whiteboard, (whiteboard) => whiteboard.user, { nullable: true, onDelete: 'CASCADE' })
  @Field(() => [Whiteboard], { nullable: true })
  whiteboards: Whiteboard[];
}

@InputType()
export class SignupInput {
  
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 30)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  password: string;
}