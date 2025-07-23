import { PartialType } from "@nestjs/mapped-types";
import { CreateReviewDto } from "./create-review.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateReviewDto {
  @Field({ nullable: true })
  ranking?: number;
}
