import { Module } from "@nestjs/common";
import { DermantinService } from "./dermantin.service";
import { DermantinController } from "./dermantin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dermantin } from "./entities/dermantin.entity";
import { Category } from "../category/entities/category.entity";
import { DermantinResolver } from "./dermantin.resolver";
import { DermantinImage } from "../dermantin_images/entities/dermantin_image.entity";
import { Advertisement } from "../advertisements/entities/advertisement.entity";
import { CategoryResolver } from "../category/category.resolver";
import { CategoryModule } from "../category/category.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Dermantin,
      Category,
      DermantinImage,
      Advertisement,
    ]),
    CategoryModule,
  ],
  controllers: [DermantinController],
  providers: [DermantinService, CategoryResolver, DermantinResolver],
  exports: [DermantinService, DermantinResolver],
})
export class DermantinModule {}
