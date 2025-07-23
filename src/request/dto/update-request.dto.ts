import { PartialType } from "@nestjs/mapped-types";
import { CreateRequestDto } from "./create-request.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateRequestDto {
  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  status?: string;
}
