import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { UpdateAdvertisementDto } from "./dto/update-advertisement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Advertisement } from "./entities/advertisement.entity";
import { Repository } from "typeorm";
import { Dermantin } from "../dermantin/entities/dermantin.entity";

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRepo: Repository<Advertisement>
  ) {}

  createWithDermantin(
    createAdvertisementDto: CreateAdvertisementDto,
    dermantin: Dermantin
  ) {
    const newAdvertisement = this.advertisementRepo.create({
      ...createAdvertisementDto,
      dermantin,
    });
    return this.advertisementRepo.save(newAdvertisement);
  }

  create(createAdvertisementDto: CreateAdvertisementDto) {
    return this.advertisementRepo.save(createAdvertisementDto);
  }

  findAll() {
    return this.advertisementRepo.find({ relations: ["dermantin"] });
  }

  findOne(id: number) {
    return this.advertisementRepo.findOneBy({ id });
  }

  async update(id: number, updateAdvertisementDto: UpdateAdvertisementDto) {
    const advertisement = await this.advertisementRepo.preload({
      id,
      ...updateAdvertisementDto,
    });
    if (!advertisement) {
      throw new NotFoundException(`#${+id} li advertisement mavjud emas`);
    }
    return this.advertisementRepo.save(advertisement);
  }

  async remove(id: number) {
    await this.advertisementRepo.delete(+id);
    return id;
  }
}
