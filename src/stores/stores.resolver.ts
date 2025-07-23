import { Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { StoresService } from "./stores.service";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Store } from "./entities/store.entity";
import { UsersResolver } from "../users/users.resolver";

@Resolver(() => Store)
export class StoreResolver {
  constructor(
    private readonly storesService: StoresService,
    private readonly userResolver: UsersResolver
  ) {}
  @Query(() => [Store])
  findAllStore() {
    return this.storesService.findAll();
  }

  @Query(() => Store)
  findOneStore(@Args("id", { type: () => ID }) id: number) {
    return this.storesService.findOne(+id);
  }

  @Mutation(() => Store)
  async createStore(
    @Args("createStore") createStoreDto: CreateStoreDto,
    @Args("userId", { type: () => ID }) userId: number
  ) {
    const user = await this.userResolver.findOneUser(+userId);
    return this.storesService.createWithManager(createStoreDto, user!);
  }

  @Mutation(() => Store)
  updateStore(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateStore") updateStoreDto: UpdateStoreDto
  ) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Mutation(() => Number)
  removeStore(@Args("id", { type: () => ID }) id: string) {
    return this.storesService.remove(+id);
  }
}
