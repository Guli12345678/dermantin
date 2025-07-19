import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AdminsService } from "./admins.service";
import { Admin } from "./entities/admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Resolver(() => Admin)
export class AdminsResolver {
  constructor(private readonly adminsService: AdminsService) {}

  @Query(() => [Admin])
  findAllAdmins() {
    return this.adminsService.findAll();
  }

  @Query(() => Admin)
  findOneAdmin(@Args("id", { type: () => ID }) id: string) {
    return this.adminsService.findOne(+id);
  }

  @Mutation(() => Admin)
  createAdmin(@Args("createAdmin") createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Mutation(() => Admin)
  updateAdmin(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateAdmin") updateAdminDto: UpdateAdminDto
  ) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Mutation(() => Number)
  removeAdmin(@Args("id", { type: () => ID }) id: string) {
    return this.adminsService.remove(+id);
  }
}
