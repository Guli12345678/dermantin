import { InputType, Field, PartialType, ID } from "@nestjs/graphql";
import { CreateAdminDto } from "./create-admin.dto";

@InputType()
export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @Field(() => ID)
  id: number;
}
