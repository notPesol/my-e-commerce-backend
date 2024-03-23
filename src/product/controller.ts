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
import { ProductService } from './service';
import { ProductDTO } from './dto/dto';
import { BaseController } from 'src/common/controller/base.controller';
import { Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'src/common/decorator/api-response';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { UserSearchDTO } from 'src/user/dto/search.dto';
import { Public } from 'src/common/decorator/public';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('/product')
export class ProductController extends BaseController<ProductDTO> {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }

  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(ProductDTO, 'array')
  @Get()
  async findAll(@Query() searchDTO: UserSearchDTO) {
    const result = await this.service.findAll(searchDTO);
    return result;
  }

  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(ProductDTO, 'object')
  @Get('/:id')
  async findByPk(@Param('id') id: number) {
    return super.findByPk(id);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(ProductDTO, 'object')
  @Post()
  async create(@Body() body: ProductDTO): Promise<ResponseDTO<ProductDTO>> {
    return await super.create(body);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(ProductDTO, 'object')
  @Put()
  async update(@Body() body: ProductDTO): Promise<ResponseDTO<ProductDTO>> {
    return await super.update(body);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(ProductDTO, 'boolean')
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ResponseDTO<boolean>> {
    return await super.delete(id);
  }
}
