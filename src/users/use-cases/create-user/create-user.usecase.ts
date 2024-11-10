import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { MailService } from 'src/services/mail/mail.service';
import { CreateUserInputDTO, CreateUserOutputDTO } from 'src/users/dtos';
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
  constructor(
    private readonly usersRepository: UsersRepository,
    private mailService: MailService,
  ) {}

  async execute({
    createUserInputDto,
  }: ICreateUserUseCaseInput): Promise<ICreateUserUseCaseOutput> {
    const passwordHashed = await hash(createUserInputDto.password, 8);

    const user: ICreateUserProps = {
      firstName: createUserInputDto.firstName,
      lastName: createUserInputDto.lastName,
      email: createUserInputDto.email,
      password: passwordHashed,
    };

    //await this.usersRepository.create(user);
    this.mailService.sendUserConfirmation(user, 'olaa');

    return {
      userOutputDto: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }
}
