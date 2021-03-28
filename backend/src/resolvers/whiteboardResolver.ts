import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../models/user';
import { Whiteboard } from '../models/whiteboard';

@Resolver()
export class WhiteboardResolver {
  @Mutation(() => Whiteboard)
  async CreateWhiteboard(
    @Arg('email') email: string,
  ) {
    const user = await User.findOne({ email });
    if (!user) return new Error(`email ${email} does not exist`);
    const whiteboard = await Whiteboard.create({ user }).save();
    return whiteboard;
  }

  @Mutation(() => String)
  async UpdateWhiteboard(
    @Arg('id') id: number,
    @Arg('data') data: string,
  ) {
    const whiteboard = await Whiteboard.findOne({ id });
    if (!whiteboard) return new Error(`whiteboard ${id} does not exist`);
    whiteboard.data = data;
    await Whiteboard.save(whiteboard);
    return `Whiteboard ${id} saved successfully`;
  }

  // Query: list of user's whiteboard
}
