import { Injectable } from '@nestjs/common';
import { BaseAssociationRepository } from 'src/common/repository/base-association.repository';
import { RoleRepository } from 'src/role/repository';
import { UserRoleRepository } from 'src/user-role/repository';
import { UserRepository } from 'src/user/repository';

export enum includeKey {
  userRoles = 'user-roles',
  roleUsers = 'role-users',
}

@Injectable()
export class UserRoleAssociationRepository extends BaseAssociationRepository {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleRepository: RoleRepository,
  ) {
    super();
  }

  protected init(): void {
    this.model = this.userRepository.getModel();
  }

  protected setupAssociation(): void {
    const UserModel = this.userRepository.getModel();
    const UserRoleModel = this.userRoleRepository.getModel();
    const RoleModel = this.roleRepository.getModel();

    UserModel.belongsToMany(RoleModel, {
      through: UserRoleModel,
      foreignKey: 'userId',
      otherKey: 'roleId',
    });

    RoleModel.belongsToMany(UserModel, {
      through: UserRoleModel,
      foreignKey: 'roleId',
      otherKey: 'userId',
    });
  }

  protected setupIncludeOptions(): void {
    this.includeOptions.set(includeKey.userRoles, {
      model: this.roleRepository.getModel(),
    });
    this.includeOptions.set(includeKey.roleUsers, {
      model: this.userRepository.getModel(),
    });
  }

  getIncludeOption(key: includeKey) {
    this.setModel(key);

    return this.includeOptions.get(key);
  }

  protected setModel(key: includeKey): void {
    if (key === includeKey.userRoles) {
      this.model = this.userRepository.getModel();
    } else if (key === includeKey.roleUsers) {
      this.model = this.roleRepository.getModel();
    }
  }

  // util method
  getUserRepository() {
    return this.userRepository;
  }

  getUserRoleRepository() {
    return this.userRoleRepository;
  }

  getRoleRepository() {
    return this.roleRepository;
  }
}
