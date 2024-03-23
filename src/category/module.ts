import { Module } from '@nestjs/common';
import { CategoryService } from './service';
import { CategoryController } from './controller';
import { SequelizeModule } from 'src/common/sequelize/module';
import { CategoryRepository } from './repository';

@Module({
  imports: [SequelizeModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
