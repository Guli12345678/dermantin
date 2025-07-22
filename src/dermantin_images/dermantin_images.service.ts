import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDermantinImageDto } from "./dto/create-dermantin_image.dto";
import { UpdateDermantinImageDto } from "./dto/update-dermantin_image.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DermantinImage } from "./entities/dermantin_image.entity";
import { Repository } from "typeorm";
import { Dermantin } from "../dermantin/entities/dermantin.entity";

@Injectable()
export class DermantinImagesService {
  constructor(
    @InjectRepository(DermantinImage)
    private readonly dermantinImageRepo: Repository<DermantinImage>
  ) {}

  createWithDermantin(
    createDermantinImageDto: CreateDermantinImageDto,
    dermantin: Dermantin
  ) {
    const newDermantinImage = this.dermantinImageRepo.create({
      ...createDermantinImageDto,
      dermantin,
    });
    return this.dermantinImageRepo.save(newDermantinImage);
  }

  create(createDermantinImageDto: CreateDermantinImageDto) {
    return this.dermantinImageRepo.save(createDermantinImageDto);
  }

  findAll() {
    return this.dermantinImageRepo.find({ relations: ["dermantin"] });
  }

  findOne(id: number) {
    return this.dermantinImageRepo.findOneBy({ id });
  }

  async update(id: number, updateDermantinImageDto: UpdateDermantinImageDto) {
    const image = await this.dermantinImageRepo.preload({
      id,
      ...updateDermantinImageDto,
    });
    if (!image) {
      throw new NotFoundException(`#${+id} li dermantin image mavjud emas`);
    }
    return this.dermantinImageRepo.save(image);
  }

  async remove(id: number) {
    await this.dermantinImageRepo.delete(+id);
    return id;
  }
}
