import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UpdateUserInputDTO, UpdateUserOutputDTO } from 'src/users/dtos';
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
      firstName: updateUserInputDto.firstName,
      email: updateUserInputDto.email,
      roleId: updateUserInputDto.roleId,
      password: passwordHashed,
    };

    await this.usersRepository.update(user, id);

    return {
      updateUserOutputDto: {
        firstName: updateUserInputDto.firstName,
        email: updateUserInputDto.email,
      },
    };
  }
}
