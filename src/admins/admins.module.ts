import { Module } from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { AdminsController } from "./admins.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { AdminsResolver } from "./admins.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminsController],
  providers: [AdminsService, AdminsResolver],
  exports: [AdminsService],
})
export class AdminsModule {}
