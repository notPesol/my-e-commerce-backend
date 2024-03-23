import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/dto/base.dto';
import { Status } from 'src/common/enum';

export class ProductDTO extends BaseDTO {
  @ApiProperty({
    required: false,
  })
  id: number;

  @ApiProperty()
  brandId: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    required: false,
  })
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

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
