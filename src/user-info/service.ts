import { BadRequestException, Injectable } from '@nestjs/common';
import { UserInfoRepository } from './repository';
import { UserInfoDTO } from './dto/dto';
import { UserInfoSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';
import { BaseService } from 'src/common/service/base.service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { Request } from 'express';
import { UserRolesDTO } from 'src/auth/dto/dto';
import { isAdmin } from 'src/common/utils/validation';

@Injectable()
export class UserInfoService extends BaseService<UserInfoDTO> {
  constructor(private readonly userInfoRepository: UserInfoRepository) {
    super(userInfoRepository);
  }

  async findUserInfoByPk(id: number, req: Request): Promise<UserInfoDTO> {
    const user: UserRolesDTO = req['user'];

    if (!isAdmin(user.roles)) {
      return this.findOne({ where: { userId: user.id } });
    }
    
    const model = await this.repository.findByPk(id);
    return this.toJson(model);
  }

  async updateUserInfo(data: UserInfoDTO, req: Request): Promise<UserInfoDTO> {
    const user: UserRolesDTO = req['user'];

    if (user.id !== data.userId && !isAdmin(user.roles)) {
      throw new BadRequestException();
    }

    const model = await this.userInfoRepository.updateById(data.id, data);
    return new UserInfoDTO(model);
  }

  async createUserInfo(data: UserInfoDTO, req: Request): Promise<UserInfoDTO> {
    const user: UserRolesDTO = req['user'];

    if (user.id !== data.userId && !isAdmin(user.roles)) {
      throw new BadRequestException();
    }

    const [model, isCreated] = await this.userInfoRepository.findOrCreate(
      { userId: data.userId },
      data,
    );

    if (!isCreated) {
      throw new BadRequestException('User info is already exists.');
    }

    return new UserInfoDTO(model);
  }

  async findAll(
    searchDTO: UserInfoSearchDTO,
  ): Promise<ResponseDTO<UserInfoDTO[]>> {
    const where = {};
    const options = {};

    if (searchDTO.query) {
      where[Op.or] = [
        {
          firstName: {
            [Op.iLike]: `%${searchDTO.query}%`,
          },
        },
        {
          lastName: {
            [Op.iLike]: `%${searchDTO.query}%`,
          },
        },
      ];
    }

    if (!searchDTO.ignorePage) {
      options['limit'] = searchDTO.limit;
      options['offset'] = (searchDTO.page - 1) * searchDTO.limit;
    }

    const responseDTO = new ResponseDTO<UserInfoDTO[]>();

    const findOptions = {
      where,
      ...options,
    };

    if (searchDTO.count) {
      const { rows, count } = await this.findAndCountAll(findOptions);
      responseDTO.data = rows;
      responseDTO.totalItem = count;
    } else {
      const rows = await this.getAll(findOptions);
      responseDTO.data = rows;
    }

    return responseDTO;
  }
}
