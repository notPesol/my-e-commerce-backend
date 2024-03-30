import { RoleDTO } from 'src/role/dto/dto';
import { Role } from '../enum';

export const isAdmin = (roles: RoleDTO[]): boolean => {
  return roles.some((role) => role.name === Role.Admin);
};
