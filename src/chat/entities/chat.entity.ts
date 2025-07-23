import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Message } from "../../message/entities/message.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "../../stores/entities/store.entity";
import { User } from "../../users/entities/user.entity";

@ObjectType()
@InputType("chatinput")
@Entity()
export class Chat {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Store)
  @ManyToOne((type) => Store, (store) => store.chats)
  store: Store;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.chats)
  user: User;

  @Field((type) => [Message])
  @OneToMany((type) => Message, (message) => message.chat)
  messages: Message[];
}
