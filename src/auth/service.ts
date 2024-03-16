import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  UserRoleAssociationRepository,
  includeKey,
} from 'src/user-role-association/repository';
import { UserDTO } from 'src/user/dto/dto';
import {
  RegisterDTO,
  UserRolesDTO,
  LoginDTO,
  AuthResponseDTO,
} from './dto/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAssociationRepository: UserRoleAssociationRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async findOne(username: string) {
    const model = await this.userAssociationRepository.findOne({
      include: this.userAssociationRepository.getIncludeOption(
        includeKey.userRoles,
      ),
      where: {
        username,
      },
    });

    return new UserRolesDTO(model);
  }

  private async createAccessToken(userRolesDTO: UserRolesDTO) {
    const payload = {
      sub: userRolesDTO.id,
      id: userRolesDTO.id,
      username: userRolesDTO.username,
      roles: userRolesDTO.roles.map((role) => ({
        id: role.id,
        name: role.name,
      })),
    };

    return await this.jwtService.signAsync(payload);
  }

  async login(body: LoginDTO): Promise<AuthResponseDTO> {
    const userAssociationDTO = await this.findOne(body.username);

    const isTrue = await bcrypt.compare(
      body.password,
      userAssociationDTO.password,
    );

    if (!userAssociationDTO?.id || !isTrue) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.createAccessToken(userAssociationDTO);
    return { accessToken };
  }

  async register(body: RegisterDTO): Promise<AuthResponseDTO> {
    const model = await this.userAssociationRepository.findOne({
      where: { username: body.username },
    });

    if (model) {
      throw new BadRequestException('Username is already exist.');
    }

    const saltOrRounds = 10;
    const password = body.password;
    body.password = await bcrypt.hash(password, saltOrRounds);

    const transaction = await this.userAssociationRepository
      .getModel()
      .sequelize.transaction();

    try {
      const newUserModel = await this.userAssociationRepository.create(
        {
          ...body,
        },
        { transaction },
      );
      const userDTO = new UserDTO(newUserModel);

      await this.userAssociationRepository
        .getUserRoleRepository()
        .getModel()
        .bulkCreate(
          body.roleIds.map((roleId) => ({ userId: userDTO.id, roleId })),
          { transaction },
        );

      await transaction.commit();
    } catch (error) {
      transaction.rollback();
      throw error;
    }

    const userAssociationDTO = await this.findOne(body.username);

    const accessToken = await this.createAccessToken(userAssociationDTO);
    return { accessToken };
  }
}
