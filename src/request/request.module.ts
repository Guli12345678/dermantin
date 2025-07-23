import { Module } from "@nestjs/common";
import { RequestsService } from "./request.service";
import { RequestController } from "./request.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { Requests } from "./entities/request.entity";
import { User } from "../users/entities/user.entity";
import { RequestResolver } from "./requests.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Requests, User]), UsersModule],
  controllers: [RequestController],
  providers: [RequestsService, RequestResolver],
  exports: [RequestsService, RequestResolver],
})
export class RequestModule {}
