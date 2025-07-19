import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { UpdateAdminDto } from "../admins/dto/update-admin.dto";
import { Admin } from "../admins/entities/admin.entity";
import * as bcrypt from "bcrypt";
@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepo: Repository<Admin>
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const {
      full_name,
      email,
      phone,
      password,
      confirm_password,
      is_active,
      is_creator,
    } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas!");
    }

    const hashed_password = await bcrypt.hash(password, 7);
    const adminToSave = {
      full_name,
      email,
      phone,
      is_active,
      is_creator,
      hashed_password,
    };
    return this.adminsRepo.save(adminToSave);
  }

  findAll() {
    return this.adminsRepo.find();
  }

  findOne(id: number | string) {
    const numId = Number(id);
    if (!numId || isNaN(numId)) {
      throw new BadRequestException("Invalid admin id");
    }
    return this.adminsRepo.findOneBy({ id: numId });
  }

  findByEmail(email: string) {
    return this.adminsRepo.findOneBy({ email });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminsRepo.update(updateAdminDto, { id });
  }

  remove(id: number) {
    return this.adminsRepo.delete({ id });
  }
}
