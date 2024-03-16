import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  query: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @Transform((params) => parseInt(params.value))
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @Transform((params) => parseInt(params.value))
  limit: number = 10;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @Transform((params) => params.value === 'true')
  ignorePage: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @Transform((params) => params.value === 'true')
  count: boolean;
}
