import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { Repository } from "typeorm";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>
  ) {}
  createWithDermantin(
    createReviewDto: CreateReviewDto,
    dermantin: Dermantin,
    user: User
  ) {
    const newReview = this.reviewRepo.create({
      ...createReviewDto,
      dermantin,
      user,
    });
    return this.reviewRepo.save(newReview);
  }
  create(createReviewDto: CreateReviewDto) {
    return this.reviewRepo.save(createReviewDto);
  }

  findAll() {
    return this.reviewRepo.find({ relations: ["dermantin"] });
  }

  findOne(id: number) {
    return this.reviewRepo.findOneBy({ id });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const user = await this.reviewRepo.preload({
      id,
      ...updateReviewDto,
    });
    if (!user) {
      throw new NotFoundException(`#${+id} li review mavjud emas`);
    }
    return this.reviewRepo.save(user);
  }

  async remove(id: number) {
    await this.reviewRepo.delete(+id);
    return id;
  }
}
