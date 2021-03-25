import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';
import { User } from './user';

@Entity()
@ObjectType()
export class Whiteboard extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @ManyToOne(() => User, (user) => user.whiteboards)
    @Field()
    user: User;
}
