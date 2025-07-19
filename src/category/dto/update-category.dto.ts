import { InputType, Field, PartialType, ID } from "@nestjs/graphql";
import { CreateCategoryDto } from "./create-category.dto";

@InputType()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @Field(() => ID)
  id: number;
}
