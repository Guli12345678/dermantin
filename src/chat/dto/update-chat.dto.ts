import { PartialType } from "@nestjs/mapped-types";
import { CreateChatDto } from "./create-chat.dto";
import { Field, InputType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { Store } from "../../stores/entities/store.entity";
@InputType()
export class UpdateChatDto {
  @Field({ nullable: true })
  user?: User;

  @Field({ nullable: true })
  store?: Store;
}
