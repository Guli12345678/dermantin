import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

@ObjectType()
@Entity()
export class Advertisement {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  discount_percent: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column({ enum: ["pending", "completed", "rejected"] })
  status: string;

  @Field()
  @Column()
  start_date: Date;

  @Field()
  @Column()
  end_date: Date;

  @Field((type) => Dermantin)
  @ManyToOne((type) => Dermantin, (dermantin) => dermantin.ads)
  dermantin: Dermantin;
}
