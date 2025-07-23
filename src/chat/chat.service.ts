import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "./entities/chat.entity";
import { Repository } from "typeorm";
import { Store } from "../stores/entities/store.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>
  ) {}
  createWithDermantin(createChatDto: CreateChatDto, store: Store, user: User) {
    const newChat = this.chatRepo.create({
      ...createChatDto,
      store,
      user,
    });
    return this.chatRepo.save(newChat);
  }
  create(createChatDto: CreateChatDto) {
    return this.chatRepo.save(createChatDto);
  }

  findAll() {
    return this.chatRepo.find({ relations: ["store", "user"] });
  }

  findOne(id: number) {
    return this.chatRepo.findOneBy({ id });
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const chat = await this.chatRepo.preload({
      id,
      ...updateChatDto,
    });
    if (!chat) {
      throw new NotFoundException(`#${+id} li chat mavjud emas`);
    }
    return this.chatRepo.save(chat);
  }

  async remove(id: number) {
    await this.chatRepo.delete(+id);
    return id;
  }
}
