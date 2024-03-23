import { Module } from '@nestjs/common';
import { UserRoleAssociationRepository } from './repository';
import { UserRoleModule } from 'src/user-role/module';
import { RoleModule } from 'src/role/module';
import { UserModule } from 'src/user/module';

@Module({
  imports: [UserModule, RoleModule, UserRoleModule],
  providers: [UserRoleAssociationRepository],
  exports: [UserRoleAssociationRepository],
})
export class UserRoleAssociationModule {}
