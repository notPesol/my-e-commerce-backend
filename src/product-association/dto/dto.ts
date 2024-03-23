import { ApiProperty } from '@nestjs/swagger';
import { BrandDTO } from 'src/brand/dto/dto';
import { CategoryDTO } from 'src/category/dto/dto';
import { ProductDTO } from 'src/product/dto/dto';

export class ProductAssociationDTO extends ProductDTO {
  @ApiProperty({
    type: BrandDTO,
  })
  brand: BrandDTO;

  @ApiProperty({
    type: CategoryDTO,
  })
  category: CategoryDTO;
}
