import { Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Review } from "./entities/review.entity";
import { DermantinResolver } from "../dermantin/dermantin.resolver";
import { UsersResolver } from "../users/users.resolver";

@Resolver(() => Review)
export class ReviewResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly dermantinResolver: DermantinResolver,
    private readonly userResolver: UsersResolver
  ) {}
  @Query(() => [Review])
  findAllReview() {
    return this.reviewsService.findAll();
  }

  @Query(() => Review)
  findOneReview(@Args("id", { type: () => ID }) id: number) {
    return this.reviewsService.findOne(+id);
  }

  @Mutation(() => Review)
  async createReview(
    @Args("createReview") createReviewDto: CreateReviewDto,
    @Args("dermantinId", { type: () => ID }) dermantinId: number,
    @Args("userId", { type: () => ID }) userId: number
  ) {
    const dermantin =
      await this.dermantinResolver.findOneDermantin(+dermantinId);
    const user = await this.userResolver.findOneUser(+userId);
    return this.reviewsService.createWithDermantin(
      createReviewDto,
      dermantin!,
      user!
    );
  }

  @Mutation(() => Review)
  updateReview(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateReview") updateReviewDto: UpdateReviewDto
  ) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Mutation(() => Number)
  removeReview(@Args("id", { type: () => ID }) id: string) {
    return this.reviewsService.remove(+id);
  }
}
