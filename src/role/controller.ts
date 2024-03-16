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
import { RoleService } from './service';
import { RoleDTO } from './dto/dto';
import { BaseController } from 'src/common/controller/base.controller';
import { Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'src/common/decorator/api-response';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { UserDTO } from 'src/user/dto/dto';
import { UserSearchDTO } from 'src/user/dto/search.dto';
import { Public } from 'src/common/decorator/public';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('/role')
export class RoleController extends BaseController<RoleDTO> {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }

  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(RoleDTO, 'array')
  @Get()
  async findAll(@Query() searchDTO: UserSearchDTO) {
    const result = await this.service.findAll(searchDTO);
    return result;
  }

  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(RoleDTO, 'object')
  @Get('/:id')
  async findByPk(@Param('id') id: number) {
    return super.findByPk(id);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(RoleDTO, 'object')
  @Post()
  async create(@Body() body: RoleDTO): Promise<ResponseDTO<RoleDTO>> {
    return await super.create(body);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(RoleDTO, 'object')
  @Put()
  async update(@Body() body: RoleDTO): Promise<ResponseDTO<RoleDTO>> {
    return await super.update(body);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(RoleDTO, 'boolean')
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ResponseDTO<boolean>> {
    return await super.delete(id);
  }
}
