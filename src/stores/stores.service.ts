import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { Repository } from "typeorm";
import { Dermantin } from "../dermantin/entities/dermantin.entity";
import { User, UserRole } from "../users/entities/user.entity";

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>
  ) {}
  createWithManager(createStoreDto: CreateStoreDto, manager: User) {
    if (manager.role !== UserRole.MANAGER) {
      throw new ForbiddenException(
        "Only users with MANAGER role can manage stores."
      );
    }

    const newStore = this.storeRepo.create({
      ...createStoreDto,
      manager,
    });
    return this.storeRepo.save(newStore);
  }

  create(createStoreDto: CreateStoreDto) {
    return this.storeRepo.save(createStoreDto);
  }

  findAll() {
    return this.storeRepo.find({ relations: ["user"] });
  }

  findOne(id: number) {
    return this.storeRepo.findOneBy({ id });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const user = await this.storeRepo.preload({
      id,
      ...updateStoreDto,
    });
    if (!user) {
      throw new NotFoundException(`#${+id} li store mavjud emas`);
    }
    return this.storeRepo.save(user);
  }

  async remove(id: number) {
    await this.storeRepo.delete(+id);
    return id;
  }
}
