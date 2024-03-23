import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { Public } from 'src/common/decorator/public';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDTO, LoginDTO, AuthResponseDTO } from './dto/dto';
import { ApiSwaggerResponse } from 'src/common/decorator/api-response';

@Public()
@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(AuthResponseDTO, 'object')
  @Post('/register')
  async register(@Body() body: RegisterDTO) {
    const result = await this.authService.register(body);
    const responseDTO = new ResponseDTO<AuthResponseDTO>();
    responseDTO.data = result;
    return responseDTO;
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSwaggerResponse(AuthResponseDTO, 'object')
  @Post('/login')
  async login(@Body() body: LoginDTO) {
    const result = await this.authService.login(body);
    const responseDTO = new ResponseDTO<AuthResponseDTO>();
    responseDTO.data = result;
    return responseDTO;
  }
}
