import { Field, ID, ObjectType } from "@nestjs/graphql";
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

@ObjectType()
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
}
