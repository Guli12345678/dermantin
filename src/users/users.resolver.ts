import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  findOneUser(@Args("id", { type: () => ID }) id: number) {
    return this.usersService.findOne(+id);
  }

  @Mutation(() => User)
  createUser(@Args("createUser") createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Mutation(() => User)
  updateUser(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateUser") updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Mutation(() => Number)
  removeUser(@Args("id", { type: () => ID }) id: string) {
    return this.usersService.remove(+id);
  }
}
