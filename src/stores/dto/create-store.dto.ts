import { ObjectType, Field, Int, InputType } from "@nestjs/graphql";

@InputType()
export class CreateStoreDto {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  logo_url: string;

  @Field()
  region: string;

  @Field()
  description: string;

  @Field(() => Int)
  rating_id: number;

  @Field()
  status: string;
}
