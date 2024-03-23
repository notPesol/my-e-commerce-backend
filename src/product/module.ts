import { Module } from '@nestjs/common';
import { ProductService } from './service';
import { ProductController } from './controller';
import { SequelizeModule } from 'src/common/sequelize/module';
import { ProductRepository } from './repository';
import { BrandModule } from 'src/brand/module';
import { CategoryModule } from 'src/category/module';

@Module({
  imports: [SequelizeModule, BrandModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService, ProductRepository],
})
export class ProductModule {}
