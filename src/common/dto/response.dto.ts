import { ApiProperty } from "@nestjs/swagger";

export class ResponseDTO<T> {
  @ApiProperty()
  message: string = 'success';

  @ApiProperty()
  totalItem: number = 0;

  data: T;
}
