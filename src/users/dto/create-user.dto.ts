import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {
  @Field()
  full_name: string;
  @Field()
  phone: string;
  @Field()
  password: string;
  @Field()
  confirm_password: string;
  @Field({ nullable: true })
  role?: string;
  @Field({ nullable: true })
  region?: string;
  @Field({ nullable: true })
  lang?: string;
}
