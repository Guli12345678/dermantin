import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Chat } from "../../chat/entities/chat.entity";
import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";

@ObjectType()
@Entity("stores")
@InputType("storeinput")
export class Store {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column("text")
  logo_url: string;

  @Field()
  @Column({ type: "enum", enum: ["Asia", "Europe", "America"] })
  region: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  rating_id: number;

  @Field()
  @Column({ type: "enum", enum: ["active", "inactive", "pending"] })
  status: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.stores)
  manager: User;

  @Field((type) => [Chat])
  @OneToMany((type) => Chat, (chat) => chat.store)
  chats: Chat[];
}
