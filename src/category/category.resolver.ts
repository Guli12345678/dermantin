import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { Category } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  findAllCategories() {
    return this.categoryService.findAll();
  }

  @Query(() => Category)
  findOneCategory(@Args("id", { type: () => ID }) id: string) {
    return this.categoryService.findOne(+id);
  }

  @Mutation(() => Category)
  createCategory(@Args("createCategory") createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateCategory") updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Mutation(() => Number)
  removeCategory(@Args("id", { type: () => ID }) id: string) {
    return this.categoryService.remove(+id);
  }
}
