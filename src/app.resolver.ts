import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './app.service';
import { User } from './entity/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  listUsers() {
    return this.userService.list();
  }

  @Query(() => User, { name: 'user' })
  getUserById(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findById(id);
  }
}
