import { Module } from '@nestjs/common';
import { BrandService } from './service';
import { BrandController } from './controller';
import { SequelizeModule } from 'src/common/sequelize/module';
import { BrandRepository } from './repository';

@Module({
  imports: [SequelizeModule],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
  exports: [BrandService, BrandRepository],
})
export class BrandModule {}
