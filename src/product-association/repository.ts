import { Injectable } from '@nestjs/common';
import { BrandRepository } from 'src/brand/repository';
import { CategoryRepository } from 'src/category/repository';
import { BaseAssociationRepository } from 'src/common/repository/base-association.repository';
import { ProductRepository } from 'src/product/repository';

export enum includeKey {
  productBrand = 'product-brand',
  productCategory = 'product-category',
  productBrandCategory = 'product-brand-category',
}

@Injectable()
export class ProductAssociationRepository extends BaseAssociationRepository {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly brandRepository: BrandRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {
    super();
  }

  protected init(): void {
    this.model = this.productRepository.getModel();
  }

  protected setupAssociation(): void {
    const ProductModel = this.productRepository.getModel();
    const BrandModel = this.brandRepository.getModel();
    const CategoryModel = this.categoryRepository.getModel();

    ProductModel.belongsTo(BrandModel, {
      foreignKey: 'brandId',
    });

    BrandModel.hasMany(ProductModel, {
      foreignKey: 'brandId',
    });

    ProductModel.belongsTo(CategoryModel, {
      foreignKey: 'categoryId',
    });

    CategoryModel.hasMany(ProductModel, {
      foreignKey: 'categoryId',
    });
  }

  protected setupIncludeOptions(): void {
    this.includeOptions.set(includeKey.productBrand, {
      model: this.brandRepository.getModel(),
    });
    this.includeOptions.set(includeKey.productCategory, {
      model: this.categoryRepository.getModel(),
    });
    this.includeOptions.set(includeKey.productBrandCategory, [
      {
        model: this.brandRepository.getModel(),
      },
      {
        model: this.categoryRepository.getModel(),
      },
    ]);
  }

  getIncludeOption(key: includeKey) {
    this.setModel(key);

    return this.includeOptions.get(key);
  }

  protected setModel(key: includeKey): void {
    if (key === includeKey.productBrand || key === includeKey.productCategory) {
      this.model = this.productRepository.getModel();
    }
  }
}
