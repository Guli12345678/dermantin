import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { DermantinImage } from "../../dermantin_images/entities/dermantin_image.entity";
import { Advertisement } from "../../advertisements/entities/advertisement.entity";
import { Review } from "../../reviews/entities/review.entity";
import { History } from "../../history/entities/history.entity";

@ObjectType()
@InputType("dermantininput")
@Entity()
export class Dermantin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  price: string;

  @Field()
  @Column()
  rating: string;

  @Field()
  @Column()
  class: string;

  @Field((type) => Category)
  @ManyToOne((type) => Category, (category) => category.dermantin)
  category: Category;

  @Field((type) => [DermantinImage])
  @OneToMany((type) => DermantinImage, (image) => image.dermantin)
  images: DermantinImage[];

  @Field((type) => [Advertisement])
  @OneToMany((type) => Advertisement, (ad) => ad.dermantin)
  ads: Advertisement[];

  @Field((type) => [Review])
  @OneToMany((type) => Review, (review) => review.dermantin)
  reviews: Review[];

  @Field((type) => [History])
  @OneToMany((type) => History, (history) => history.dermantin)
  history: History[];
}
