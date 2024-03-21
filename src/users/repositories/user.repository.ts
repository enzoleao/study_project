import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { IUserProps } from '../interfaces/user.interface';
import { IFindUsersFilter } from '../interfaces/find-users-filters.interface';
import { UserOutputDTO } from '../dtos/user-output.dto';
import { Users } from '@prisma/client';

export abstract class UsersRepository {
  abstract create(user: IUserProps): Promise<UserOutputDTO>;
  abstract findAll(
    filters: IFindUsersFilter,
  ): Promise<PaginatedOutputDto<UserOutputDTO>>;
  abstract findUnique(email: string): Promise<Users>;
}
