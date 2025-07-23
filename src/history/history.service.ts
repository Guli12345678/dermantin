import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { UpdateHistoryDto } from "./dto/update-history.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { History } from "./entities/history.entity";
import { Repository } from "typeorm";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepo: Repository<History>
  ) {}
  createWithDermantin(createHistoryDto: CreateHistoryDto, dermantin: Dermantin, user: User) {
    const newHistory = this.historyRepo.create({
      ...createHistoryDto,
      dermantin,
      user,
    });
    return this.historyRepo.save(newHistory);
  }
  create(createHistoryDto: CreateHistoryDto) {
    return this.historyRepo.save(createHistoryDto);
  }

  findAll() {
    return this.historyRepo.find({ relations: ["dermantin", "user"] });
  }

  findOne(id: number) {
    return this.historyRepo.findOneBy({ id });
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto) {
    const history = await this.historyRepo.preload({
      id,
      ...updateHistoryDto,
    });
    if (!history) {
      throw new NotFoundException(`#${+id} li history mavjud emas`);
    }
    return this.historyRepo.save(history);
  }

  async remove(id: number) {
    await this.historyRepo.delete(+id);
    return id;
  }
}
