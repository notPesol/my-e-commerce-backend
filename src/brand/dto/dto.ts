import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/dto/base.dto';
import { Status } from 'src/common/enum';

export class BrandDTO extends BaseDTO {
  @ApiProperty({
    required: false,
  })
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    required: false,
  })
  description: string;

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
