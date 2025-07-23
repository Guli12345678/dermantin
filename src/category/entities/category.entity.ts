import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

@InputType("catinput")
@ObjectType()
@Entity()
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => [Dermantin])
  @OneToMany((type) => Dermantin, (dermantin) => dermantin.category)
  dermantin: Dermantin[];
}
