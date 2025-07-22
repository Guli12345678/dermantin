import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateAdvertisementDto {
  @Field(() => Int)
  discount_percent: number;

  @Field()
  type: string;

  @Field()
  status: string;

  @Field()
  start_date: Date;

  @Field()
  end_date: Date;
}
