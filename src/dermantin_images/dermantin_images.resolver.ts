import { Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { DermantinImagesService } from "./dermantin_images.service";
import { CreateDermantinImageDto } from "./dto/create-dermantin_image.dto";
import { UpdateDermantinImageDto } from "./dto/update-dermantin_image.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { DermantinImage } from "./entities/dermantin_image.entity";
import { DermantinResolver } from "../dermantin/dermantin.resolver";

@Resolver("dermantin_images")
export class DermantinImageResolver {
  constructor(
    private readonly dermantin_imagesService: DermantinImagesService,
    private readonly dermantinResolver: DermantinResolver
  ) {}
  @Query(() => [DermantinImage])
  findAllDermantinImage() {
    return this.dermantin_imagesService.findAll();
  }

  @Query(() => DermantinImage)
  findOneDermantinImage(@Args("id", { type: () => ID }) id: string) {
    return this.dermantin_imagesService.findOne(+id);
  }

  @Mutation(() => DermantinImage)
  async createDermantinImage(
    @Args("createDermantinImage")
    createDermantinImageDto: CreateDermantinImageDto,
    @Args("dermantinId", { type: () => ID }) dermantinId: number
  ) {
    const dermantin =
      await this.dermantinResolver.findOneDermantin(+dermantinId);
    return this.dermantin_imagesService.createWithDermantin(
      createDermantinImageDto,
      dermantin!
    );
  }

  @Mutation(() => DermantinImage)
  updateDermantinImage(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateDermantinImage")
    updateDermantinImageDto: UpdateDermantinImageDto
  ) {
    return this.dermantin_imagesService.update(+id, updateDermantinImageDto);
  }

  @Mutation(() => Number)
  removeDermantinImage(@Args("id", { type: () => ID }) id: string) {
    return this.dermantin_imagesService.remove(+id);
  }
}
