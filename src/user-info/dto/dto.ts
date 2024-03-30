import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/dto/base.dto';
import { Status } from 'src/common/enum';

export class UserInfoDTO extends BaseDTO {
  @ApiProperty({
    required: false,
  })
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({
    description: 'Date of birth.',
  })
  dob: Date;

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
