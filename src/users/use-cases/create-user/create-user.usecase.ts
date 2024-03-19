import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserInputDto } from 'src/users/dtos/create-user-input.dto';
import { CreateUserOutputDto } from 'src/users/dtos/create-user-output.dto';
import { IUserProps } from 'src/users/interfaces/user.interface';
import { UsersRepository } from 'src/users/repositories/user.repository';

interface ICreateUserUseCaseInput {
  createUserInputDto: CreateUserInputDto;
}

interface ICreateUserUseCaseOutput {
  userOutputDto: CreateUserOutputDto;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    createUserInputDto,
  }: ICreateUserUseCaseInput): Promise<ICreateUserUseCaseOutput> {
    const passwordHashed = await hash(createUserInputDto.password, 8);

    const user: IUserProps = {
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
