import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { UpdateUserInputDTO } from '../dtos/update-user-input.dto';
import { UpdateUserUseCase } from '../use-cases/update-user/update-user.usecase';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Permissions({
    permissions: ['users.get'],
  })
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
  async create(@Body() createUserInputDto: CreateUserInputDTO) {
    const { userOutputDto } = await this.createUserUseCase.execute({
      createUserInputDto,
    });

    return {
      message: 'Usuário cadastrado com sucesso',
      data: userOutputDto,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserInputDto: UpdateUserInputDTO,
  ) {
    const { updateUserOutputDto } = await this.updateUserUseCase.execute(
      updateUserInputDto,
      id,
    );
    return {
      message: 'Usuário atualizado com sucesso',
      data: updateUserOutputDto,
    };
  }
}
