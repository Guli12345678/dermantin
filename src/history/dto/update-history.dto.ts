import { PartialType } from "@nestjs/mapped-types";
import { CreateHistoryDto } from "./create-history.dto";
import { Field, InputType } from "@nestjs/graphql";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";
import { User } from "../../users/entities/user.entity";

@InputType()
export class UpdateHistoryDto {
  @Field({ nullable: true })
  dermantin?: Dermantin;

  @Field({ nullable: true })
  user?: User;
}
