import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStoreDto {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  manager_id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  logo_url?: string;

  @Field({ nullable: true })
  region?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  rating_id?: number;

  @Field({ nullable: true })
  status?: string;
}
