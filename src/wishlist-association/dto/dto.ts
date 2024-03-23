import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/dto/base.dto';
import { Status } from 'src/common/enum';
import { ProductDTO } from 'src/product/dto/dto';

export class WishlistDTO extends BaseDTO {
  @ApiProperty({
    required: false,
  })
  id: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty({
    enum: Status,
    required: false,
  })
  status: Status;

  @ApiProperty({
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    required: false,
  })
  updatedAt: Date;
}

export class WishlistAssociationDTO extends WishlistDTO {
  @ApiProperty({
    type: ProductDTO,
  })
  product: ProductDTO;
}
