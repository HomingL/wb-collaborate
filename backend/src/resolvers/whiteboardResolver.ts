import { UpdateWhiteboardInput, WhiteboardNameInput, WhiteboardIdInput } from './../models/whiteboard';
/* eslint-disable linebreak-style */
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
    @Arg('input') {name}: WhiteboardNameInput,
  ) {
    const { payload } = ctx;
    const email = payload?.email;
    if (!payload || !email) return new Error('token has insufficient info!');
    const user = await User.findOne({ email });
    if (!user) return new Error(`email ${email} does not exist`);
    const whiteboard = await Whiteboard.create({ user, name }).save();
    return whiteboard;
  }

  @Mutation(() => String)
  async UpdateWhiteboard(
    @Arg('input') {data, id}: UpdateWhiteboardInput,

  ) {
    const whiteboard = await Whiteboard.findOne({ id });
    if (!whiteboard) return new Error(`whiteboard ${id} does not exist`);
    whiteboard.data = data;
    await Whiteboard.save(whiteboard);
    return `Whiteboard ${id} saved successfully`;
  }

  @Query(() => Whiteboard, { nullable: true })
  async GetWhiteboard(
    @Arg('input') {id}: WhiteboardIdInput,
  ) {
    const whiteboard = await Whiteboard.findOne(id);
    if (!whiteboard) return new Error(`Whiteboard id: ${id} does not exist`);
    return whiteboard;
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
    const whiteboards = await Whiteboard
      .createQueryBuilder('whiteboard')
      .leftJoinAndSelect('whiteboard.user', 'user')
      .where(`user.id = '${payload?.id}'`)
      .getMany();
    return whiteboards;
  }

  @Mutation(() => String)
  async DeleteWhiteboard(
    @Arg('input') {id}: WhiteboardIdInput,
  ) {
    try {
      await Whiteboard
        .createQueryBuilder()
        .delete()
        .from(Whiteboard)
        .where('id = :id', { id })
        .execute();
      return `Whiteboard id: ${id} has been deleted successfully`;
    } catch { return new Error(`Whiteboard id: ${id} does not exist`); }
  }
}
