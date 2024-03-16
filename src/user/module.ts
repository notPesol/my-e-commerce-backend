import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './service';
import { UserController } from './controller';
import { SequelizeModule } from 'src/common/sequelize/module';
import { UserRepository } from './repository';
import { UserRoleModule } from 'src/user-role/module';

@Module({
  imports: [SequelizeModule, forwardRef(() => UserRoleModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
