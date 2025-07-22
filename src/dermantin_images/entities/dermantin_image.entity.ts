import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

@Entity()
@ObjectType()
export class DermantinImage {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  image_url: string;

  @Field()
  @Column()
  is_main: string;

  @Field((type) => Dermantin)
  @ManyToOne((type) => Dermantin, (dermantin) => dermantin.images)
  dermantin: Dermantin;
}
