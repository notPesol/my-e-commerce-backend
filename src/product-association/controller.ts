import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductAssociationService } from './service';
import { ProductAssociationDTO } from './dto/dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'src/common/decorator/api-response';
import { Public } from 'src/common/decorator/public';
import { ProductAssociationSearchDTO } from './dto/search.dto';
import { includeKey } from './repository';
import { ResponseDTO } from 'src/common/dto/response.dto';

@ApiTags('ProductAssociation')
@ApiBearerAuth()
@Controller('/product-association')
export class ProductAssociationController {
  constructor(
    private readonly productAssociationService: ProductAssociationService,
  ) {}

  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'view', enum: includeKey })
  @ApiSwaggerResponse(ProductAssociationDTO, 'array')
  @Get('/:view')
  async findAll(
    @Param('view') view: includeKey,
    @Query() searchDTO: ProductAssociationSearchDTO,
  ) {
    const result = await this.productAssociationService.findAll(
      view,
      searchDTO,
    );
    return result;
  }

  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'view', enum: includeKey })
  @ApiSwaggerResponse(ProductAssociationDTO, 'object')
  @Get('/:view/:id')
  async findByPk(@Param('view') view: includeKey, @Param('id') id: number) {
    const result = await this.productAssociationService.findByPk(view, id);
    const responseDTO = new ResponseDTO<ProductAssociationDTO>();
    responseDTO.data = result;
    return responseDTO;
  }
}
