import { Module } from "@nestjs/common";
import { MessagesService } from "./message.service";
import { MessageController } from "./message.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Chat } from "../chat/entities/chat.entity";
import { ChatModule } from "../chat/chat.module";
import { MessageResolver } from "./message.resolver";
import { ChatResolver } from "../chat/chat.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat]), ChatModule],
  controllers: [MessageController],
  providers: [MessagesService, MessageResolver],
  exports: [MessagesService, MessageResolver],
})
export class MessageModule {}
