import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserInputDto } from '../dtos/create-user-input.dto';
import { CreateUserOutputDto } from '../dtos/create-user-output.dto';
import { ListUsersUseCase } from '../use-cases/all-users/all-users.use.case';
import { ListUsersInputDto } from '../dtos/list-users-input.dto';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { UserOutputDto } from '../dtos/user-output.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { CreateUserUseCase } from '../use-cases/create-user/create-user.usecase';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) {}

  @Get()
  @ApiPaginatedResponse(UserOutputDto)
  @UseGuards(JwtAuthGuard)
  async index(
    @Query() listUsersInputDto: ListUsersInputDto,
  ): Promise<PaginatedOutputDto<UserOutputDto>> {
    const { userOutputDto } = await this.listUsersUseCase.execute({
      listUsersInputDto,
    });

    return userOutputDto;
  }
  @Get(':id')
  async show(@Param() params: any): Promise<string> {
    console.log(params);
    return 'This action returns one user';
  }

  @Post()
  async create(
    @Body() createUserInputDto: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    const { userOutputDto } = await this.createUserUseCase.execute({
      createUserInputDto,
    });

    return userOutputDto;
  }
}
