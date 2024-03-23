import { Module } from '@nestjs/common';
import { ProductAssociationRepository } from './repository';
import { ProductModule } from 'src/product/module';
import { BrandModule } from 'src/brand/module';
import { CategoryModule } from 'src/category/module';
import { ProductAssociationController } from './controller';
import { ProductAssociationService } from './service';

@Module({
  imports: [ProductModule, BrandModule, CategoryModule],
  controllers: [ProductAssociationController],
  providers: [ProductAssociationRepository, ProductAssociationService],
  exports: [ProductAssociationRepository, ProductAssociationService],
})
export class ProductAssociationModule {}
