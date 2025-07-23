import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateRequestDto {
  @Field()
  text: string;

  @Field()
  status: string;
}
