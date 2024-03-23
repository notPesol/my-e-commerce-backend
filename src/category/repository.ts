import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataTypes, ModelCtor, Sequelize } from 'sequelize';
import { Status } from 'src/common/enum';
import { BaseRepoSitory } from 'src/common/repository/base.repositoty';
import { SequelizeService } from 'src/common/sequelize/service';

@Injectable()
export class CategoryRepository extends BaseRepoSitory {
  constructor(private readonly databaseService: SequelizeService) {
    super();
  }

  protected init(): void {
    this.model = this.databaseService.defineModel(
      'category',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(40),
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true
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
          allowNull: true
        },
      },
      { tableName: 'categories' },
    );
  }
}
