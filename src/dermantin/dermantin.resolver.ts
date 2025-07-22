import { Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { DermantinService } from "./dermantin.service";
import { CreateDermantinDto } from "./dto/create-dermantin.dto";
import { UpdateDermantinDto } from "./dto/update-dermantin.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Dermantin } from "./entities/dermantin.entity";
import { CategoryResolver } from "../category/category.resolver";

@Resolver("dermantins")
export class DermantinResolver {
  constructor(
    private readonly dermantinsService: DermantinService,
    private readonly categoryResolver: CategoryResolver
  ) {}
  @Query(() => [Dermantin])
  findAllDermantin() {
    return this.dermantinsService.findAll();
  }

  @Query(() => Dermantin)
  findOneDermantin(@Args("id", { type: () => ID }) id: number) {
    return this.dermantinsService.findOne(+id);
  }

  @Mutation(() => Dermantin)
  async createDermantin(
    @Args("createDermantin") createDermantinDto: CreateDermantinDto,
    @Args("categoryId", { type: () => ID }) categoryId: number
  ) {
    const category = await this.categoryResolver.findOneCategory(+categoryId);
    return this.dermantinsService.createWithCategory(
      createDermantinDto,
      category!
    );
  }

  @Mutation(() => Dermantin)
  updateDermantin(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateDermantin") updateDermantinDto: UpdateDermantinDto
  ) {
    return this.dermantinsService.update(+id, updateDermantinDto);
  }

  @Mutation(() => Number)
  removeDermantin(@Args("id", { type: () => ID }) id: string) {
    return this.dermantinsService.remove(+id);
  }
}
