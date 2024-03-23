import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductAssociationRepository, includeKey } from './repository';
import { ProductAssociationDTO } from './dto/dto';
import { ProductAssociationSearchDTO } from './dto/search.dto';
import { FindOptions, Op } from 'sequelize';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class ProductAssociationService {
  constructor(
    private readonly productAssociationRepository: ProductAssociationRepository,
  ) {}

  private hasIncludeKey(key: includeKey): boolean {
    return Object.values(includeKey).includes(key);
  }

  async findByPk(key: includeKey, id: number): Promise<ProductAssociationDTO> {
    if (!this.hasIncludeKey(key)) {
      throw new BadRequestException('Include key not found.');
    }

    const includeOption =
      this.productAssociationRepository.getIncludeOption(key);
    const model = await this.productAssociationRepository.findOne({
      include: includeOption,
      where: { id },
    });

    return new ProductAssociationDTO(model);
  }

  async findAll(
    key: includeKey,
    searchDTO: ProductAssociationSearchDTO,
  ): Promise<ResponseDTO<ProductAssociationDTO[]>> {
    if (!this.hasIncludeKey(key)) {
      throw new BadRequestException('Include key not found.');
    }
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

    const responseDTO = new ResponseDTO<ProductAssociationDTO[]>();

    const includeOption =
      this.productAssociationRepository.getIncludeOption(key);

    const findOptions: FindOptions = {
      where,
      ...options,
      include: includeOption,
    };

    if (searchDTO.count) {
      const { rows, count } =
        await this.productAssociationRepository.findAndCountAll(findOptions);
      responseDTO.data = Object.assign([], rows);
      responseDTO.totalItem = count;
    } else {
      const rows = await this.productAssociationRepository.findAll(findOptions);
      responseDTO.data = Object.assign([], rows);
    }

    return responseDTO;
  }
}
