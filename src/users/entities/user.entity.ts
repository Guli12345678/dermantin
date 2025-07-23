import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "../../reviews/entities/review.entity";
import { Requests } from "../../request/entities/request.entity";
import { Chat } from "../../chat/entities/chat.entity";
import { History } from "../../history/entities/history.entity";
import { Store } from "../../stores/entities/store.entity";

export enum UserRole {
  USER = "user",
  MANAGER = "manager",
}

export enum UserRegion {
  REGION1 = "USA",
  REGION2 = "UZB",
}

export enum UserLang {
  EN = "en",
  RU = "ru",
  UZ = "uz",
}

@ObjectType()
@InputType("UserInput")
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  full_name: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column({ type: "bigint", default: 0 })
  is_verified: number;

  @Field({ nullable: true })
  @Column({ type: "enum", enum: UserRegion, nullable: true })
  region: UserRegion;

  @Field({ nullable: true })
  @Column({ type: "enum", enum: UserLang, nullable: true })
  lang: UserLang;

  @Field()
  @Column()
  hashed_password: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  hashed_refresh_token: string;

  @Field((type) => [Review])
  @OneToMany((type) => Review, (review) => review.user)
  reviews: Review[];

  @Field((type) => [Requests])
  @OneToMany((type) => Requests, (req) => req.user)
  requests: Requests[];

  @Field((type) => [Chat])
  @OneToMany((type) => Chat, (chat) => chat.user)
  chats: Chat[];

  @Field((type) => [History])
  @OneToMany((type) => History, (history) => history.user)
  history: History[];

  @Field((type) => [Store])
  @OneToMany((type) => Store, (store) => store.manager)
  stores: Store[];

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
