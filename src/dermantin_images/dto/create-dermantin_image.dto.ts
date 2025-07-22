import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateDermantinImageDto {
  @Field()
  image_url: string;

  @Field()
  is_main: string;
}
