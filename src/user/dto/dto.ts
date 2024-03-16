import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';
import { Status } from 'src/common/enum';

export class UserDTO extends BaseDTO {
  @ApiProperty({
    required: false,
  })
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

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
