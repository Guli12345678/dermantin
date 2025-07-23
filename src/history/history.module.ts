import { Module } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { HistoryController } from "./history.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { History } from "./entities/history.entity";
import { User } from "../users/entities/user.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { UsersModule } from "../users/users.module";
import { DermantinModule } from "../dermantin/dermantin.module";
import { HistoryResolver } from "./history.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([History, User, Dermantin]),
    UsersModule,
    DermantinModule,
  ],
  controllers: [HistoryController],
  providers: [HistoryService, HistoryResolver],
  exports: [HistoryService, HistoryResolver],
})
export class HistoryModule {}
