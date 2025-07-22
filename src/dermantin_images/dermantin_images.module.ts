import { Module } from "@nestjs/common";
import { DermantinImagesService } from "./dermantin_images.service";
import { DermantinImagesController } from "./dermantin_images.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DermantinImage } from "./entities/dermantin_image.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { DermantinImageResolver } from "./dermantin_images.resolver";
import { DermantinResolver } from "../dermantin/dermantin.resolver";
import { DermantinService } from "../dermantin/dermantin.service";
import { DermantinModule } from "../dermantin/dermantin.module";
import { CategoryModule } from "../category/category.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([DermantinImage, Dermantin]),
    DermantinModule,
    CategoryModule
  ],
  controllers: [DermantinImagesController],
  providers: [
    DermantinImagesService,
    DermantinImageResolver,
    DermantinResolver,
  ],
  exports: [DermantinImagesService],
})
export class DermantinImagesModule {}
