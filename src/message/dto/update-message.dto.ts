import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { Field, InputType } from '@nestjs/graphql';
import { Chat } from '../../chat/entities/chat.entity';

@InputType()
export class UpdateMessageDto {
  @Field({ nullable: true })
  chat: Chat;

  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  is_read: boolean;
}
