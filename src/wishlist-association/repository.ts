import { Injectable } from '@nestjs/common';
import { DataTypes, Sequelize } from 'sequelize';
import { Status } from 'src/common/enum';
import { BaseAssociationRepository } from 'src/common/repository/base-association.repository';
import { SequelizeService } from 'src/common/sequelize/service';
import { ProductRepository } from 'src/product/repository';
import { UserRepository } from 'src/user/repository';

export enum includeKey {
  all = 'all',
}

@Injectable()
export class WishlistAssociationRepository extends BaseAssociationRepository {
  constructor(
    private readonly databaseService: SequelizeService,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  protected init(): void {
    this.model = this.databaseService.defineModel(
      'wishlist',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: this.productRepository.getModel(),
            key: 'id',
          },
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: this.userRepository.getModel(),
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
      { tableName: 'wishlists' },
    );
  }

  protected setupAssociation(): void {
    this.model.belongsTo(this.productRepository.getModel(), {
      foreignKey: 'productId',
    });
  }

  protected setupIncludeOptions(): void {
    this.includeOptions.set(includeKey.all, [
      {
        model: this.productRepository.getModel(),
      },
    ]);
  }

  getIncludeOption(key: includeKey) {
    return this.includeOptions.get(key);
  }

  protected setModel(key: includeKey) {}
}
