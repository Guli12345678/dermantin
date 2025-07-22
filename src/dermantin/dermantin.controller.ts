import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DermantinService } from './dermantin.service';
import { CreateDermantinDto } from './dto/create-dermantin.dto';
import { UpdateDermantinDto } from './dto/update-dermantin.dto';

@Controller('dermantin')
export class DermantinController {
  constructor(private readonly dermantinService: DermantinService) {}

  @Post()
  create(@Body() createDermantinDto: CreateDermantinDto) {
    return this.dermantinService.create(createDermantinDto);
  }

  @Get()
  findAll() {
    return this.dermantinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dermantinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDermantinDto: UpdateDermantinDto) {
    return this.dermantinService.update(+id, updateDermantinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dermantinService.remove(+id);
  }
}
