import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserInfoService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { UserInfoDTO } from './dto/dto';
import { UserInfoSearchDTO } from './dto/search.dto';
import { Roles } from 'src/common/decorator/roles';
import { Role } from 'src/common/enum';
import { BaseController } from 'src/common/controller/base.controller';
import { ApiSwaggerResponse } from 'src/common/decorator/api-response';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('UserInfos')
@ApiBearerAuth()
@Controller('/user-info')
export class UserInfoController extends BaseController<UserInfoDTO> {
  constructor(private readonly userInfoService: UserInfoService) {
    super(userInfoService);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(UserInfoDTO, 'array')
  @Get()
  async findAll(@Query() searchDTO: UserInfoSearchDTO) {
    const result = await this.service.findAll(searchDTO);
    return result;
  }

  @Roles(Role.Admin, Role.User)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(UserInfoDTO, 'object')
  @Get('/:id')
  async findByPk(@Param('id') id: number, @Req() req: Request) {
    const result = await this.userInfoService.findUserInfoByPk(id, req);
    const responseDTO = new ResponseDTO<UserInfoDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  @Roles(Role.Admin, Role.User)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(UserInfoDTO, 'object')
  @Post()
  async create(@Body() body: UserInfoDTO, @Req() req: Request): Promise<ResponseDTO<UserInfoDTO>> {
    const result = await this.userInfoService.createUserInfo(body, req);
    const responseDTO = new ResponseDTO<UserInfoDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  @Roles(Role.Admin, Role.User)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(UserInfoDTO, 'object')
  @Put()
  async update(@Body() body: UserInfoDTO, @Req() req: Request): Promise<ResponseDTO<UserInfoDTO>> {
    const result = await this.userInfoService.updateUserInfo(body, req);
    const responseDTO = new ResponseDTO<UserInfoDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(UserInfoDTO, 'boolean')
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ResponseDTO<boolean>> {
    return await super.delete(id);
  }
}
