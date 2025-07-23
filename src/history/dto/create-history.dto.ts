import { Field, InputType } from "@nestjs/graphql";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";
import { User } from "../../users/entities/user.entity";

@InputType()
export class CreateHistoryDto {
  @Field()
  dermantin: Dermantin;

  @Field()
  user: User;
}
