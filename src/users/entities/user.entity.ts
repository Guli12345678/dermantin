import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserRole {
  USER = "user",
  ADMIN = "manager",
}

export enum UserRegion {
  REGION1 = "USA",
  REGION2 = "UZB",
}

export enum UserLang {
  EN = "en",
  RU = "ru",
  UZ = "uz",
}

@ObjectType()
@Entity("users")
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  full_name: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Field()
  @Column({ type: "bigint", default: 0 })
  is_verified: number;

  @Field({ nullable: true })
  @Column({ type: "enum", enum: UserRegion, nullable: true })
  region: UserRegion;

  @Field({ nullable: true })
  @Column({ type: "enum", enum: UserLang, nullable: true })
  lang: UserLang;

  @Field()
  @Column()
  hashed_password: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  hashed_refresh_token: string;
}
