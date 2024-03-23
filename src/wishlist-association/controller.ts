import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WishlistAssociationService } from './service';
import { WishlistAssociationDTO, WishlistDTO } from './dto/dto';
import { Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'src/common/decorator/api-response';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { WishlistSearchDTO } from './dto/search.dto';
import { Request } from 'express';

@ApiTags('Wishlists')
@ApiBearerAuth()
@Controller('/wishlist')
export class WishlistAssociationController {
  constructor(private readonly wishlistService: WishlistAssociationService) {}

  @Roles(Role.Admin, Role.User)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(WishlistAssociationDTO, 'array')
  @Get()
  async findAll(@Query() searchDTO: WishlistSearchDTO, @Req() req: Request) {
    const result = await this.wishlistService.findAll(searchDTO, req);
    return result;
  }

  @Roles(Role.Admin, Role.User)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(WishlistAssociationDTO, 'object')
  @Get('/:id')
  async findByPk(@Param('id') id: number, @Req() req: Request) {
    const result = await this.wishlistService.findOne(id, req);
    const responseDTO = new ResponseDTO<WishlistDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  @Roles(Role.User)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(WishlistDTO, 'object')
  @Post()
  async create(
    @Body() body: WishlistDTO,
    @Req() req: Request,
  ): Promise<ResponseDTO<WishlistDTO>> {
    const result = await this.wishlistService.create(body, req);
    const responseDTO = new ResponseDTO<WishlistDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  @Roles(Role.Admin, Role.User)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(WishlistDTO, 'boolean')
  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<ResponseDTO<boolean>> {
    const result = await this.wishlistService.delete(id, req);
    const responseDTO = new ResponseDTO<boolean>();
    responseDTO.data = result;
    return responseDTO;
  }
}
