import { Module, forwardRef } from '@nestjs/common';
import { UserInfoService } from './service';
import { UserInfoController } from './controller';
import { SequelizeModule } from 'src/common/sequelize/module';
import { UserInfoRepository } from './repository';
import { UserRoleModule } from 'src/user-role/module';

@Module({
  imports: [SequelizeModule, forwardRef(() => UserRoleModule)],
  controllers: [UserInfoController],
  providers: [UserInfoService, UserInfoRepository],
  exports: [UserInfoService, UserInfoRepository],
})
export class  UserInfoModule {}
