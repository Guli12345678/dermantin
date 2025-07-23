import { Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { RequestsService } from "./request.service";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Requests } from "./entities/request.entity";
import { UsersResolver } from "../users/users.resolver";

@Resolver("requests")
export class RequestResolver {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly userResolver: UsersResolver
  ) {}
  @Query(() => [Requests])
  findAllRequest() {
    return this.requestsService.findAll();
  }

  @Query(() => Requests)
  findOneRequest(@Args("id", { type: () => ID }) id: number) {
    return this.requestsService.findOne(+id);
  }

  @Mutation(() => Requests)
  async createRequest(
    @Args("createRequest") createRequestDto: CreateRequestDto,
    @Args("userId", { type: () => ID }) userId: number
  ) {    const user = await this.userResolver.findOneUser(+userId);
    return this.requestsService.createWithDermantin(
      createRequestDto,
      user!
    );
  }

  @Mutation(() => Requests)
  updateRequest(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateRequest") updateRequestDto: UpdateRequestDto
  ) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  @Mutation(() => Number)
  removeRequest(@Args("id", { type: () => ID }) id: string) {
    return this.requestsService.remove(+id);
  }
}
