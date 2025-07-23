import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Requests } from "./entities/request.entity";
import { Repository } from "typeorm";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Requests)
    private readonly requestRepo: Repository<Requests>
  ) {}
  createWithDermantin(
    createRequestDto: CreateRequestDto,
    user: User
  ) {
    const newRequest = this.requestRepo.create({
      ...createRequestDto,
      user,
    });
    return this.requestRepo.save(newRequest);
  }
  create(createRequestDto: CreateRequestDto) {
    return this.requestRepo.save(createRequestDto);
  }

  findAll() {
    return this.requestRepo.find({ relations: ["user"] });
  }

  findOne(id: number) {
    return this.requestRepo.findOneBy({ id });
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    const user = await this.requestRepo.preload({
      id,
      ...updateRequestDto,
    });
    if (!user) {
      throw new NotFoundException(`#${+id} li request mavjud emas`);
    }
    return this.requestRepo.save(user);
  }

  async remove(id: number) {
    await this.requestRepo.delete(+id);
    return id;
  }
}
