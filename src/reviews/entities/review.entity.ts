import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

@ObjectType()
@InputType("ReviewInput")
@Entity()
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  ranking: number;

  @Field((type) => Dermantin)
  @ManyToOne((type) => Dermantin, (dermantin) => dermantin.reviews)
  dermantin: Dermantin;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.reviews)
  user: User;
}
