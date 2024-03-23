import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repository';
import { ProductDTO } from './dto/dto';
import { ProductSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';
import { BaseService } from 'src/common/service/base.service';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class ProductService extends BaseService<ProductDTO> {
  constructor(private readonly productRepository: ProductRepository) {
    super(productRepository);
  }

  async findAll(searchDTO: ProductSearchDTO): Promise<ResponseDTO<ProductDTO[]>> {
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

    const responseDTO = new ResponseDTO<ProductDTO[]>();

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
