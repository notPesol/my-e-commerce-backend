import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';
import { RoleDTO } from 'src/role/dto/dto';
import { UserDTO } from 'src/user/dto/dto';

export class RegisterDTO extends BaseDTO {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({
    type: [Number],
    required: true,
  })
  roleIds: number[];
}

export class LoginDTO {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UserRolesDTO extends UserDTO {
  @ApiProperty()
  roles: RoleDTO[];
}

export class AuthResponseDTO extends BaseDTO {
  @ApiProperty()
  accessToken: string;
}
