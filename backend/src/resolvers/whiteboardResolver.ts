import { Resolver, Mutation, Arg, UseMiddleware, Ctx, Query } from 'type-graphql';
import { User } from '../models/user';
import { Whiteboard } from '../models/whiteboard';
import { isAuthenticated } from '../middlewares/auth';
import { Context } from '../context';

@Resolver()
export class WhiteboardResolver {
  @Mutation(() => Whiteboard)
  @UseMiddleware(isAuthenticated)
  async CreateWhiteboard(
    @Ctx() ctx: Context,
  ) {
    const { payload } = ctx;
    const email = payload?.email;
    if (!payload || !email) return new Error('token has insufficient info!');
    const user = await User.findOne({ email });
    if (!user) return new Error(`email ${email} does not exist`);
    const whiteboard = await Whiteboard.create({ user }).save();
    return whiteboard;
  }

  @Mutation(() => String)
  async UpdateWhiteboard(
    @Arg('id') id: string,
    @Arg('data') data: string,
  ) {
    const whiteboard = await Whiteboard.findOne({ id });
    if (!whiteboard) return new Error(`whiteboard ${id} does not exist`);
    whiteboard.data = data;
    await Whiteboard.save(whiteboard);
    return `Whiteboard ${id} saved successfully`;
  }

  @Query(() => [Whiteboard])
  @UseMiddleware(isAuthenticated)
  async GetWhiteboards(
    @Ctx() ctx: Context,
  ) {
    const { payload } = ctx;
    const email = payload?.email;
    const user = await User.findOne({ email });
    if (!user) return new Error('User no longer exists');
    return user.whiteboards;
  }
  // @Query(() => Whiteboard)
  // @UseMiddleware(isAuthenticated)
}
