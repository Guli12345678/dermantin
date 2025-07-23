import { Module } from "@nestjs/common";
import { ChatsService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chat } from "./entities/chat.entity";
import { User } from "../users/entities/user.entity";
import { Store } from "../stores/entities/store.entity";
import { UsersModule } from "../users/users.module";
import { StoresModule } from "../stores/stores.module";
import { ChatResolver } from "./chat.resolver";
import { UsersResolver } from "../users/users.resolver";
import { StoreResolver } from "../stores/stores.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, User, Store]),
    UsersModule,
    StoresModule,
  ],
  controllers: [ChatController],
  providers: [ChatsService, ChatResolver],
  exports: [ChatsService, ChatResolver],
})
export class ChatModule {}
