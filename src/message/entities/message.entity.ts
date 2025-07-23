import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "../../chat/entities/chat.entity";

@ObjectType()
@InputType("messageinpue")
@Entity()
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  is_read: boolean;

  @Field((type) => Chat)
  @ManyToOne((type) => Chat, (chat) => chat.messages)
  chat: Chat;
}
