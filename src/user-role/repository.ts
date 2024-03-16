import { Injectable } from '@nestjs/common';
import { DataTypes, Sequelize } from 'sequelize';
import { Status } from 'src/common/enum';
import { BaseRepoSitory } from 'src/common/repository/base.repositoty';
import { SequelizeService } from 'src/common/sequelize/service';
import { RoleRepository } from 'src/role/repository';
import { UserRepository } from 'src/user/repository';

@Injectable()
export class UserRoleRepository extends BaseRepoSitory {
  constructor(
    private readonly databaseService: SequelizeService,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  protected init(): void {
    this.model = this.databaseService.defineModel(
      'userRole',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: this.userRepository.getModel(),
            key: 'id',
          },
        },
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: this.roleRepository.getModel(),
            key: 'id',
          },
        },
        status: {
          type: DataTypes.ENUM(...Object.values(Status)),
          defaultValue: Status.Active,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      { tableName: 'user_roles' },
    );
  }
}
