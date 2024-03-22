import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { ICreateUserProps } from '../interfaces/user.interface';
import { IFindUsersFilter } from '../interfaces/find-users-filters.interface';
import { UserOutputDTO } from '../dtos/user-output.dto';
import { Users } from '@prisma/client';
import { IUpdateUserProps } from '../interfaces/update-user.interface';
import { UpdateUserOutputDTO } from '../dtos/update-user-output.dto';

export abstract class UsersRepository {
  abstract findAll(
    filters: IFindUsersFilter,
  ): Promise<PaginatedOutputDto<UserOutputDTO>>;
  abstract findUnique(email: string): Promise<Users>;
  abstract create(user: ICreateUserProps): Promise<UserOutputDTO>;
  abstract update(
    user: IUpdateUserProps,
    userId: string,
  ): Promise<UpdateUserOutputDTO>;
}
