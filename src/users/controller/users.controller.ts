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
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/permission.guard';
import { Permissions } from 'src/auth/permission.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ApiNormalResponse } from 'src/common/decorators/api-normal-response.decorator';
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
  ListUsersInputDto,
  UpdateUserInputDTO,
  UserOutputDTO,
} from '../dtos';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import {
  CreateUserUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
} from '../use-cases';

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
