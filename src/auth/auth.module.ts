import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AdminsModule } from "../admins/admins.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "../admins/entities/admin.entity";
import { UsersModule } from "../users/users.module";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [
    JwtModule.register({}),
    AdminsModule,
    TypeOrmModule.forFeature([Admin, User]),
    ConfigModule,
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
