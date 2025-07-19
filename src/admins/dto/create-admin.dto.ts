import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateAdminDto {
  @Field()
  full_name: string;
  @Field()
  email: string;
  @Field()
  phone: string;
  @Field()
  password: string;
  @Field()
  confirm_password: string;
  @Field({ nullable: true })
  is_active?: boolean;
  @Field({ nullable: true })
  is_creator?: boolean;
}
