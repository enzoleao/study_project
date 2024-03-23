import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UpdateUserInputDTO } from 'src/users/dtos/update-user-input.dto';
import { UpdateUserOutputDTO } from 'src/users/dtos/update-user-output.dto';
import { IUpdateUserProps } from 'src/users/interfaces/update-user.interface';
import { UsersRepository } from 'src/users/repositories/user.repository';

interface IUpdateUserUseCaseOutput {
  updateUserOutputDto: UpdateUserOutputDTO;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    updateUserInputDto: UpdateUserInputDTO,
    id: string,
  ): Promise<IUpdateUserUseCaseOutput> {
    const passwordHashed = updateUserInputDto.password
      ? await hash(updateUserInputDto.password, 8)
      : undefined;

    const user: IUpdateUserProps = {
      name: updateUserInputDto.name,
      email: updateUserInputDto.email,
      roleId: updateUserInputDto.roleId,
      password: passwordHashed,
    };

    await this.usersRepository.update(user, id);

    return {
      updateUserOutputDto: {
        name: updateUserInputDto.name,
        email: updateUserInputDto.email,
      },
    };
  }
}
