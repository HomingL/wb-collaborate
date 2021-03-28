import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';
import { User } from './user';

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
