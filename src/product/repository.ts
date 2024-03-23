import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataTypes, ModelCtor, Sequelize } from 'sequelize';
import { BrandRepository } from 'src/brand/repository';
import { CategoryRepository } from 'src/category/repository';
import { Status } from 'src/common/enum';
import { BaseRepoSitory } from 'src/common/repository/base.repositoty';
import { SequelizeService } from 'src/common/sequelize/service';

@Injectable()
export class ProductRepository extends BaseRepoSitory {
  constructor(
    private readonly databaseService: SequelizeService,
    private readonly brandRepository: BrandRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {
    super();
  }

  protected init(): void {
    this.model = this.databaseService.defineModel(
      'product',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        brandId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: this.brandRepository.getModel(),
            key: 'id',
          },
        },
        categoryId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: this.categoryRepository.getModel(),
            key: 'id',
          },
        },
        code: {
          type: DataTypes.STRING(40),
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        price: {
          type: DataTypes.DECIMAL(6, 2),
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
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
      { tableName: 'products' },
    );
  }
}
