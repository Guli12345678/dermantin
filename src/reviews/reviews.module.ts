import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { DermantinModule } from "../dermantin/dermantin.module";
import { UsersModule } from "../users/users.module";
import { User } from "../users/entities/user.entity";
import { ReviewResolver } from "./reviews.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Dermantin, User]),
    DermantinModule,
    UsersModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewResolver],
  exports: [ReviewsService, ReviewResolver],
})
export class ReviewsModule {}
