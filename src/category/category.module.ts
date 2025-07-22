import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { CategoryResolver } from "./category.resolver";
import { Dermantin } from "../dermantin/entities/dermantin.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Dermantin])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
