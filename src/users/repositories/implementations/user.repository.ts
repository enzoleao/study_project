import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/common/database/prisma.service';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { UsersRepository } from '../user.repository';
import { IFindUsersFilter } from 'src/users/interfaces/find-users-filters.interface';
import { UserOutputDto } from 'src/users/dtos/user-output.dto';
import { IUserProps } from 'src/users/interfaces/user.interface';

@Injectable()
export class IUserRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  findByEmail() {
    throw new Error('Method not implemented.');
  }

  private readonly userRepository = this.prismaService.users;

  async create(user: IUserProps): Promise<UserOutputDto> {
    const userCreated = await this.userRepository.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return userCreated;
  }

  async findAll(
    filters: IFindUsersFilter,
  ): Promise<PaginatedOutputDto<UserOutputDto>> {
    const where: Prisma.UsersFindManyArgs['where'] = {};
    for (const key in filters) {
      if (key != 'page' && key != 'perPage') {
        where[key] = filters[key];
      }
    }

    const paginate = createPaginator({ perPage: filters.perPage ?? 10 });

    return paginate<UserOutputDto, Prisma.UsersFindManyArgs>(
      this.userRepository,
      {
        where,
        orderBy: {
          id: 'desc',
        },
        select: {
          id: true,
          name: true,
          email: true,
          roleId: true,
          password: false,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          role: true,
        },
      },
      {
        page: filters.page ?? 1,
      },
    );
  }
  async findUnique(email: string): Promise<Users> {
    return this.userRepository.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });
  }
}
