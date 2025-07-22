import { PartialType } from "@nestjs/mapped-types";
import { CreateAdvertisementDto } from "./create-advertisement.dto";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateAdvertisementDto {
  @Field({ nullable: true })
  discount_percent: number;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  start_date: Date;

  @Field({ nullable: true })
  end_date: Date;
}
