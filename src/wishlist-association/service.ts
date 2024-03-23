import { BadRequestException, Injectable } from '@nestjs/common';
import { WishlistAssociationRepository, includeKey } from './repository';
import { WishlistAssociationDTO, WishlistDTO } from './dto/dto';
import { WishlistSearchDTO } from './dto/search.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { Request } from 'express';
import { UserRolesDTO } from 'src/auth/dto/dto';
import { Role } from 'src/common/enum';
import { FindOptions } from 'sequelize';

@Injectable()
export class WishlistAssociationService {
  constructor(
    private readonly wishlistRepository: WishlistAssociationRepository,
  ) {}

  async delete(id: number, req: Request) {
    const where = {
      id,
    };

    const user: UserRolesDTO = req['user'];

    if (!user.roles.some((role) => role.name === Role.Admin)) {
      where['userId'] = user.id;
    }

    const result = await this.wishlistRepository.getModel().destroy({ where });

    return result > 0;
  }

  async create(body: WishlistDTO, req: Request): Promise<WishlistDTO> {
    const user: UserRolesDTO = req['user'];

    if (user.id !== body.userId) {
      throw new BadRequestException();
    }

    const model = await this.wishlistRepository.create(body);

    return new WishlistDTO(model);
  }

  async findOne(id: number, req: Request): Promise<WishlistAssociationDTO> {
    const where = {
      id,
    };

    const user: UserRolesDTO = req['user'];

    if (!user.roles.some((role) => role.name === Role.Admin)) {
      where['userId'] = user.id;
    }

    const model = await this.wishlistRepository.findOne({
      where,
      include: this.wishlistRepository.getIncludeOption(includeKey.all),
    });

    return new WishlistAssociationDTO(model);
  }

  async findAll(
    searchDTO: WishlistSearchDTO,
    req: Request,
  ): Promise<ResponseDTO<WishlistAssociationDTO[]>> {
    const where = {};
    const options = {};

    const user: UserRolesDTO = req['user'];

    if (!user.roles.some((role) => role.name === Role.Admin)) {
      where['userId'] = user.id;
    }

    if (!searchDTO.ignorePage) {
      options['limit'] = searchDTO.limit;
      options['offset'] = (searchDTO.page - 1) * searchDTO.limit;
    }

    const responseDTO = new ResponseDTO<WishlistAssociationDTO[]>();

    const findOptions: FindOptions = {
      where,
      ...options,
      include: this.wishlistRepository.getIncludeOption(includeKey.all),
    };

    if (searchDTO.count) {
      const { rows, count } =
        await this.wishlistRepository.findAndCountAll(findOptions);
      responseDTO.data = Object.assign([], rows);
      responseDTO.totalItem = count;
    } else {
      const rows = await this.wishlistRepository.findAll(findOptions);
      responseDTO.data = Object.assign([], rows);
    }

    return responseDTO;
  }
}
