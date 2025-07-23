import { Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { ChatsService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Chat } from "./entities/chat.entity";
import { UsersResolver } from "../users/users.resolver";
import { StoreResolver } from "../stores/stores.resolver";

@Resolver(() => Chat)
export class ChatResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly userResolver: UsersResolver,
    private readonly storeResolever: StoreResolver,
  ) {}
  @Query(() => [Chat])
  findAllChat() {
    return this.chatsService.findAll();
  }

  @Query(() => Chat)
  findOneChat(@Args("id", { type: () => ID }) id: number) {
    return this.chatsService.findOne(+id);
  }

  @Mutation(() => Chat)
  async createChat(
    @Args("createChat") createChatDto: CreateChatDto,
    @Args("userId", { type: () => ID }) userId: number,
    @Args("storeId", { type: () => ID }) storeId: number
  ) {
    const user = await this.userResolver.findOneUser(+userId);
    const store = await this.storeResolever.findOneStore(+storeId);
    return this.chatsService.createWithDermantin(createChatDto, store!, user!);
  }

  @Mutation(() => Chat)
  updateChat(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateChat") updateChatDto: UpdateChatDto
  ) {
    return this.chatsService.update(+id, updateChatDto);
  }

  @Mutation(() => Number)
  removeChat(@Args("id", { type: () => ID }) id: string) {
    return this.chatsService.remove(+id);
  }
}
