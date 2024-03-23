import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BrandService } from './service';
import { BrandDTO } from './dto/dto';
import { BaseController } from 'src/common/controller/base.controller';
import { Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'src/common/decorator/api-response';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { Public } from 'src/common/decorator/public';
import { BrandSearchDTO } from './dto/search.dto';

@ApiTags('Brands')
@ApiBearerAuth()
@Controller('/brand')
export class BrandController extends BaseController<BrandDTO> {
  constructor(private readonly brandService: BrandService) {
    super(brandService);
  }

  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(BrandDTO, 'array')
  @Get()
  async findAll(@Query() searchDTO: BrandSearchDTO) {
    const result = await this.service.findAll(searchDTO);
    return result;
  }

  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(BrandDTO, 'object')
  @Get('/:id')
  async findByPk(@Param('id') id: number) {
    return super.findByPk(id);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(BrandDTO, 'object')
  @Post()
  async create(@Body() body: BrandDTO): Promise<ResponseDTO<BrandDTO>> {
    return await super.create(body);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(BrandDTO, 'object')
  @Put()
  async update(@Body() body: BrandDTO): Promise<ResponseDTO<BrandDTO>> {
    return await super.update(body);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(BrandDTO, 'boolean')
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ResponseDTO<boolean>> {
    return await super.delete(id);
  }
}
