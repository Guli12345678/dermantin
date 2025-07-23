import { Field, InputType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { Store } from "../../stores/entities/store.entity";

@InputType()
export class CreateChatDto {
  @Field()
  user: User;

  @Field()
  store: Store;
}
