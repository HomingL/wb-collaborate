import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Field, ObjectType, ID, InputType } from 'type-graphql';
import { User } from './user';
import { IsNotEmpty } from 'class-validator';

@Entity()
@ObjectType()
export class Whiteboard extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @ManyToOne(() => User, (user) => user.whiteboards, { nullable: false })
    @Field(() => User)
    user: User;

    @Column({ nullable: true })
    @Field({ nullable: true })
    data: string;
}

@InputType()
export class WhiteboardNameInput {
  
  @Field()
  @IsNotEmpty()
  name: string;
}

@InputType()
export class WhiteboardIdInput {
  
  @Field()
  @IsNotEmpty()
  id: string;
}

@InputType()
export class UpdateWhiteboardInput {
  
  @Field()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  data: string;
}