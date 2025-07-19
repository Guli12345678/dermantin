import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Admin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  full_name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column({ default: true })
  is_active: boolean;

  @Field()
  @Column({ default: false })
  is_creator: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  hashed_refresh_token: string;

  @Field()
  @Column()
  hashed_password: string;
}
