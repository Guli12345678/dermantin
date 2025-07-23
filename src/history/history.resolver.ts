import { Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { UpdateHistoryDto } from "./dto/update-history.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { History } from "./entities/history.entity";
import { UsersResolver } from "../users/users.resolver";
import { DermantinResolver } from "../dermantin/dermantin.resolver";

@Resolver(() => History)
export class HistoryResolver {
  constructor(
    private readonly historysService: HistoryService,
    private readonly userResolver: UsersResolver,
    private readonly dermantinResolver: DermantinResolver
  ) {}
  @Query(() => [History])
  findAllHistory() {
    return this.historysService.findAll();
  }

  @Query(() => History)
  findOneHistory(@Args("id", { type: () => ID }) id: number) {
    return this.historysService.findOne(+id);
  }

  @Mutation(() => History)
  async createHistory(
    @Args("createHistory") createHistoryDto: CreateHistoryDto,
    @Args("userId", { type: () => ID }) userId: number,
    @Args("dermantinId", { type: () => ID }) dermantinId: number
  ) {
    const user = await this.userResolver.findOneUser(+userId);
    const dermantin =
      await this.dermantinResolver.findOneDermantin(+dermantinId);
    return this.historysService.createWithDermantin(
      createHistoryDto,
      dermantin!,
      user!
    );
  }

  @Mutation(() => History)
  updateHistory(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateHistory") updateHistoryDto: UpdateHistoryDto
  ) {
    return this.historysService.update(+id, updateHistoryDto);
  }

  @Mutation(() => Number)
  removeHistory(@Args("id", { type: () => ID }) id: string) {
    return this.historysService.remove(+id);
  }
}
