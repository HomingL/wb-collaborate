import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  // eslint-disable-next-line class-methods-use-this
  hello() {
    return 'bye';
  }
}
