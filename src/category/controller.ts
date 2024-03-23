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
import { CategoryService } from './service';
import { CategoryDTO } from './dto/dto';
import { BaseController } from 'src/common/controller/base.controller';
import { Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'src/common/decorator/api-response';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { UserSearchDTO } from 'src/user/dto/search.dto';
import { Public } from 'src/common/decorator/public';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('/category')
export class CategoryController extends BaseController<CategoryDTO> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService);
  }

  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(CategoryDTO, 'array')
  @Get()
  async findAll(@Query() searchDTO: UserSearchDTO) {
    const result = await this.service.findAll(searchDTO);
    return result;
  }

  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(CategoryDTO, 'object')
  @Get('/:id')
  async findByPk(@Param('id') id: number) {
    return super.findByPk(id);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(CategoryDTO, 'object')
  @Post()
  async create(@Body() body: CategoryDTO): Promise<ResponseDTO<CategoryDTO>> {
    return await super.create(body);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(CategoryDTO, 'object')
  @Put()
  async update(@Body() body: CategoryDTO): Promise<ResponseDTO<CategoryDTO>> {
    return await super.update(body);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(CategoryDTO, 'boolean')
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ResponseDTO<boolean>> {
    return await super.delete(id);
  }
}
