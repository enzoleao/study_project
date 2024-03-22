import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserInputDTO } from 'src/users/dtos/create-user-input.dto';
import { CreateUserOutputDTO } from 'src/users/dtos/create-user-output.dto';
import { ICreateUserProps } from 'src/users/interfaces/user.interface';
import { UsersRepository } from 'src/users/repositories/user.repository';

interface ICreateUserUseCaseInput {
  createUserInputDto: CreateUserInputDTO;
}

interface ICreateUserUseCaseOutput {
  userOutputDto: CreateUserOutputDTO;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    createUserInputDto,
  }: ICreateUserUseCaseInput): Promise<ICreateUserUseCaseOutput> {
    const passwordHashed = await hash(createUserInputDto.password, 8);

    const user: ICreateUserProps = {
      name: createUserInputDto.name,
      email: createUserInputDto.email,
      password: passwordHashed,
    };

    await this.usersRepository.create(user);

    return {
      userOutputDto: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }
}
