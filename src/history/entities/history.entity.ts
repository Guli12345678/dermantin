import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";
import { User } from "../../users/entities/user.entity";
@InputType("historyinput")
@ObjectType()
@Entity()
export class History {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Dermantin)
  @ManyToOne((type) => Dermantin, (dermantin) => dermantin.history)
  dermantin: Dermantin;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.history)
  user: User;
}
