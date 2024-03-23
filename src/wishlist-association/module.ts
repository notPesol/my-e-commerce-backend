import { Module } from '@nestjs/common';
import { WishlistAssociationService } from './service';
import { WishlistAssociationController } from './controller';
import { SequelizeModule } from 'src/common/sequelize/module';
import { WishlistAssociationRepository } from './repository';
import { ProductModule } from 'src/product/module';
import { UserModule } from 'src/user/module';

@Module({
  imports: [SequelizeModule, ProductModule, UserModule],
  controllers: [WishlistAssociationController],
  providers: [WishlistAssociationService, WishlistAssociationRepository],
  exports: [WishlistAssociationService, WishlistAssociationRepository],
})
export class WishlistAssociationModule {}
