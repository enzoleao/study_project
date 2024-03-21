import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserInputDTO } from '../dtos/create-user-input.dto';
import { CreateUserOutputDTO } from '../dtos/create-user-output.dto';
import { ListUsersUseCase } from '../use-cases/all-users/all-users.use.case';
import { ListUsersInputDto } from '../dtos/list-users-input.dto';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { UserOutputDTO } from '../dtos/user-output.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { CreateUserUseCase } from '../use-cases/create-user/create-user.usecase';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/permission.guard';
import { Permissions } from 'src/auth/permission.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ApiNormalResponse } from 'src/common/decorators/api-normal-response.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) {}

  @Permissions('users.get')
  @ApiPaginatedResponse(UserOutputDTO)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get()
  async index(
    @Query() listUsersInputDto: ListUsersInputDto,
  ): Promise<PaginatedOutputDto<UserOutputDTO>> {
    const { userOutputDto } = await this.listUsersUseCase.execute({
      listUsersInputDto,
    });

    return userOutputDto;
  }

  @Post()
  @ApiNormalResponse(CreateUserOutputDTO)
  async create(
    @Body() createUserInputDto: CreateUserInputDTO,
  ): Promise<CreateUserOutputDTO> {
    const { userOutputDto } = await this.createUserUseCase.execute({
      createUserInputDto,
    });

    return userOutputDto;
  }
}
