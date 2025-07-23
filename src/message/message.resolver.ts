import { Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { MessagesService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Message } from "./entities/message.entity";
import { ChatResolver } from "../chat/chat.resolver";

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly chatResolver: ChatResolver
  ) {}
  @Query(() => [Message])
  findAllMessage() {
    return this.messagesService.findAll();
  }

  @Query(() => Message)
  findOneMessage(@Args("id", { type: () => ID }) id: number) {
    return this.messagesService.findOne(+id);
  }

  @Mutation(() => Message)
  async createMessage(
    @Args("createMessage") createMessageDto: CreateMessageDto,
    @Args("chatId", { type: () => ID }) chatId: number
  ) {    const chat = await this.chatResolver.findOneChat(+chatId);
    return this.messagesService.createWithDermantin(
      createMessageDto,
      chat!
    );
  }

  @Mutation(() => Message)
  updateMessage(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateMessage") updateMessageDto: UpdateMessageDto
  ) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Mutation(() => Number)
  removeMessage(@Args("id", { type: () => ID }) id: string) {
    return this.messagesService.remove(+id);
  }
}
