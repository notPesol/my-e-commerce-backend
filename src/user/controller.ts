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
import { UserService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { UserDTO } from './dto/dto';
import { UserSearchDTO } from './dto/search.dto';
import { Roles } from 'src/common/decorator/roles';
import { Role } from 'src/common/enum';
import { BaseController } from 'src/common/controller/base.controller';
import { ApiSwaggerResponse } from 'src/common/decorator/api-response';
import { ApiTags } from '@nestjs/swagger';

@Roles(Role.Admin)
@ApiTags('Users')
@Controller('/user')
export class UserController extends BaseController<UserDTO> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(UserDTO, 'array')
  @Get()
  async findAll(@Query() searchDTO: UserSearchDTO) {
    const result = await this.service.findAll(searchDTO);
    return result;
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(UserDTO, 'object')
  @Get('/:id')
  async findByPk(@Param('id') id: number) {
    const result = await this.userService.findByPk(id);
    delete result.password;
    const responseDTO = new ResponseDTO<UserDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(UserDTO, 'object')
  @Post()
  async create(@Body() body: UserDTO): Promise<ResponseDTO<UserDTO>> {
    return await super.create(body);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(UserDTO, 'object')
  @Put()
  async update(@Body() body: UserDTO): Promise<ResponseDTO<UserDTO>> {
    return await super.update(body);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(UserDTO, 'boolean')
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ResponseDTO<boolean>> {
    return await super.delete(id);
  }
}
