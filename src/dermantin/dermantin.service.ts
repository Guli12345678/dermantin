import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDermantinDto } from "./dto/create-dermantin.dto";
import { UpdateDermantinDto } from "./dto/update-dermantin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Dermantin } from "./entities/dermantin.entity";
import { Repository } from "typeorm";
import { Category } from "../category/entities/category.entity";

@Injectable()
export class DermantinService {
  constructor(
    @InjectRepository(Dermantin) private readonly dermantinRepo: Repository<Dermantin>
  ) {}
  createWithCategory(createDermantinDto: CreateDermantinDto, category: Category) {
    const newDermantin = this.dermantinRepo.create({ ...createDermantinDto, category });
    return this.dermantinRepo.save(newDermantin);
  }
  create(createDermantinDto: CreateDermantinDto) {
    return this.dermantinRepo.save(createDermantinDto);
  }

  findAll() {
    return this.dermantinRepo.find({ relations: ["category"] });
  }

  findOne(id: number) {
    return this.dermantinRepo.findOneBy({ id });
  }

  async update(id: number, updateDermantinDto: UpdateDermantinDto) {
    const user = await this.dermantinRepo.preload({ id, ...updateDermantinDto });
    if (!user) {
      throw new NotFoundException(`#${+id} li dermantin mavjud emas`);
    }
    return this.dermantinRepo.save(user);
  }

  async remove(id: number) {
    await this.dermantinRepo.delete(+id);
    return id;
  }
}