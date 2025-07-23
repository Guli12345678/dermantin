import { Field, InputType } from "@nestjs/graphql";
import { Chat } from "../../chat/entities/chat.entity";

@InputType()
export class CreateMessageDto {
  @Field()
  chat: Chat;

  @Field()
  text: string;

  @Field()
  is_read: boolean;
}
