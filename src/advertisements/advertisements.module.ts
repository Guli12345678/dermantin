import { Module } from "@nestjs/common";
import { AdvertisementsService } from "./advertisements.service";
import { AdvertisementsController } from "./advertisements.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Advertisement } from "./entities/advertisement.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { AdvertisementsResolver } from "./advertisements.resolver";
import { DermantinResolver } from "../dermantin/dermantin.resolver";
import { CategoryService } from "../category/category.service";
import { DermantinModule } from "../dermantin/dermantin.module";
import { CategoryModule } from "../category/category.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Advertisement, Dermantin]),
    DermantinModule,
    CategoryModule,
  ],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService, AdvertisementsResolver, DermantinResolver],
  exports: [AdvertisementsService],
})
export class AdvertisementsModule {}
