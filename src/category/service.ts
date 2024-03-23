import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repository';
import { CategoryDTO } from './dto/dto';
import { CategorySearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';
import { BaseService } from 'src/common/service/base.service';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class CategoryService extends BaseService<CategoryDTO> {
  constructor(private readonly categoryRepository: CategoryRepository) {
    super(categoryRepository);
  }

  async findAll(searchDTO: CategorySearchDTO): Promise<ResponseDTO<CategoryDTO[]>> {
    const where = {};
    const options = {};

    if (searchDTO.query) {
      where['name'] = {
        [Op.iLike]: `%${searchDTO.query}%`,
      };
    }
    if (!searchDTO.ignorePage) {
      options['limit'] = searchDTO.limit;
      options['offset'] = (searchDTO.page - 1) * searchDTO.limit;
    }

    const responseDTO = new ResponseDTO<CategoryDTO[]>();

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
