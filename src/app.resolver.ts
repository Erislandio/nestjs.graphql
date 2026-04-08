import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './app.service';
import { User } from './entity/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'getUser', nullable: true })
  public getUser(@Args('id') id: string) {
    const user = this.userService.findById(id);

    if (!user) return null;

    return user;
  }

  @Query(() => [User], { name: 'listUsers' })
  public listUsers() {
    return this.userService.list();
  }
}
