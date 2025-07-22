import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AdvertisementsService } from "./advertisements.service";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { UpdateAdvertisementDto } from "./dto/update-advertisement.dto";
import { Advertisement } from "./entities/advertisement.entity";
import { DermantinResolver } from "../dermantin/dermantin.resolver";

@Resolver(() => Advertisement)
export class AdvertisementsResolver {
  constructor(
    private readonly advertisementsService: AdvertisementsService,
    private readonly dermantinResolver: DermantinResolver
  ) {}

  @Query(() => [Advertisement])
  findAllAdvertisements() {
    return this.advertisementsService.findAll();
  }

  @Query(() => Advertisement)
  findOneAdvertisement(@Args("id", { type: () => ID }) id: number) {
    return this.advertisementsService.findOne(id);
  }

  @Mutation(() => Advertisement)
  async createAdvertisement(
    @Args("createAdvertisement") createAdvertisementDto: CreateAdvertisementDto,
    @Args("dermantinId", { type: () => ID }) dermantinId: number
  ) {
    const dermantin = await this.dermantinResolver.findOneDermantin(+dermantinId);
    return this.advertisementsService.createWithDermantin(createAdvertisementDto, dermantin!);
  }

  @Mutation(() => Advertisement)
  updateAdvertisement(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateAdvertisement") updateAdvertisementDto: UpdateAdvertisementDto
  ) {
    return this.advertisementsService.update(id, updateAdvertisementDto);
  }

  @Mutation(() => Number)
  removeAdvertisement(@Args("id", { type: () => ID }) id: number) {
    return this.advertisementsService.remove(id);
  }
}
