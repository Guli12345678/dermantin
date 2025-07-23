import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Repository } from "typeorm";
import { Chat } from "../chat/entities/chat.entity";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>
  ) {}
  createWithDermantin(createMessageDto: CreateMessageDto, chat: Chat) {
    const newMessage = this.messageRepo.create({
      ...createMessageDto,
      chat,
    });
    return this.messageRepo.save(newMessage);
  }
  create(createMessageDto: CreateMessageDto) {
    return this.messageRepo.save(createMessageDto);
  }

  findAll() {
    return this.messageRepo.find({ relations: ["chat"] });
  }

  findOne(id: number) {
    return this.messageRepo.findOneBy({ id });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const chat = await this.messageRepo.preload({
      id,
      ...updateMessageDto,
    });
    if (!chat) {
      throw new NotFoundException(`#${+id} li message mavjud emas`);
    }
    return this.messageRepo.save(chat);
  }

  async remove(id: number) {
    await this.messageRepo.delete(+id);
    return id;
  }
}
