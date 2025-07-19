import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>
  ) {}

  async create(createUserDto: any) {
    const { password, confirm_password, ...rest } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match!");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.usersRepo.save({ ...rest, hashed_password });
  }

  findAll() {
    return this.usersRepo.find();
  }

  findOne(id: number | string) {
    const numId = Number(id);
    if (!numId || isNaN(numId)) {
      throw new BadRequestException("Invalid user id");
    }
    return this.usersRepo.findOneBy({ id: numId });
  }

  findByPhone(phone: string) {
    return this.usersRepo.findOneBy({ phone });
  }

  async update(id: number, updateUserDto: any) {
    return this.usersRepo.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    return this.usersRepo.delete({ id });
  }
}
