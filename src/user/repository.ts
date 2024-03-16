import { Injectable } from '@nestjs/common';
import { DataTypes, Sequelize } from 'sequelize';
import { Status } from 'src/common/enum';
import { BaseRepoSitory } from 'src/common/repository/base.repositoty';
import { SequelizeService } from 'src/common/sequelize/service';

@Injectable()
export class UserRepository extends BaseRepoSitory {
  constructor(private readonly databaseService: SequelizeService) {
    super();
  }

  protected init(): void {
    this.model = this.databaseService.defineModel(
      'user',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(30),
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(72),
          allowNull: false,
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
      { tableName: 'users' },
    );
  }
}
