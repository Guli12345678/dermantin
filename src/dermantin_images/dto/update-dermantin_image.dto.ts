import { PartialType } from "@nestjs/mapped-types";
import { CreateDermantinImageDto } from "./create-dermantin_image.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateDermantinImageDto {
  @Field({ nullable: true })
  image_url: string;

  @Field({ nullable: true })
  is_main: string;
}
