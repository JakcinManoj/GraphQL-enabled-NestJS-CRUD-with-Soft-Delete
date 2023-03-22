import { Args, Query, Mutation, Resolver, Int } from '@nestjs/graphql';
import { userType } from 'src/dto/user.dto';
import { userService } from '../services/user/user.service';
import { user } from 'src/entity/user.entity';

@Resolver('user')
export class userResolver {
  constructor(private readonly UserService: userService) {}
  @Query()
  getUsers(): Promise<user[]> {
    return this.UserService.getUser();
  }

  @Mutation()
  createUser(@Args('input') input: userType) {
    console.log(input);

    return this.UserService.createUser(input);
  }
}
