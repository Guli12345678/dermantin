import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class CreateReviewDto {
  @Field()
  ranking: number;
}
