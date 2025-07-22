import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateDermantinDto {
  name: string;

  @Field()
  price: string;

  @Field()
  rating: string;

  @Field()
  class: string;
}
