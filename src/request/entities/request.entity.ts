import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@ObjectType()
@InputType("reuqestImput")
@Entity()
export class Requests {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column({ enum: ["sent", "approved", "rejected"] })
  status: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.requests)
  user: User;
}
