import { Injectable } from '@nestjs/common';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { ListUsersInputDto } from 'src/users/dtos/list-users-input.dto';
import { UserOutputDto } from 'src/users/dtos/user-output.dto';
import { UsersRepository } from 'src/users/repositories/user.repository';

interface IListUsersUseCaseInput {
  listUsersInputDto: ListUsersInputDto;
}

interface IListUsersUseCaseOutput {
  userOutputDto: PaginatedOutputDto<UserOutputDto>;
}

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    listUsersInputDto,
  }: IListUsersUseCaseInput): Promise<IListUsersUseCaseOutput> {
    const users = await this.usersRepository.findAll(listUsersInputDto);

    return {
      userOutputDto: users,
    };
  }
}
