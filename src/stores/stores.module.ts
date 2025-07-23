import { Module } from "@nestjs/common";
import { StoresService } from "./stores.service";
import { StoresController } from "./stores.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { User } from "../users/entities/user.entity";
import { Review } from "../reviews/entities/review.entity";
import { StoreResolver } from "./stores.resolver";
import { UsersModule } from "../users/users.module";
import { ReviewsModule } from "../reviews/reviews.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, User, Review]),
    UsersModule,
    ReviewsModule,
  ],
  controllers: [StoresController],
  providers: [StoresService, StoreResolver],
  exports: [StoresService, StoreResolver],
})
export class StoresModule {}
