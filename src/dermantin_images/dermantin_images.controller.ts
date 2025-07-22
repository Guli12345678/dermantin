import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DermantinImagesService } from './dermantin_images.service';
import { CreateDermantinImageDto } from './dto/create-dermantin_image.dto';
import { UpdateDermantinImageDto } from './dto/update-dermantin_image.dto';

@Controller('dermantin-images')
export class DermantinImagesController {
  constructor(private readonly dermantinImagesService: DermantinImagesService) {}

  @Post()
  create(@Body() createDermantinImageDto: CreateDermantinImageDto) {
    return this.dermantinImagesService.create(createDermantinImageDto);
  }

  @Get()
  findAll() {
    return this.dermantinImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dermantinImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDermantinImageDto: UpdateDermantinImageDto) {
    return this.dermantinImagesService.update(+id, updateDermantinImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dermantinImagesService.remove(+id);
  }
}
