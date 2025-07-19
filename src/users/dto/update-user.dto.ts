import { InputType, Field, PartialType, ID } from "@nestjs/graphql";
import { CreateUserDto } from "./create-user.dto";

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field(() => ID)
  id: number;
}
