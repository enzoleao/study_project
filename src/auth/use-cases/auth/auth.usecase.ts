import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { AuthenticateInputDto } from '../../dtos/authenticate-input.dto';
import { IAuthenticate } from '../../interface/auth.interface';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import passport from 'passport';

interface IAuthUserUseCaseOutput {
  authenticateInputDto: IAuthenticate;
}

@Injectable()
export class AuthUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    authenticateInputDto: AuthenticateInputDto,
  ): Promise<IAuthUserUseCaseOutput> {
    const user = await this.usersRepository.findUnique(
      authenticateInputDto.email,
    );
    const passwordMatch = user
      ? await compare(authenticateInputDto.password, user.password)
      : false;
    if (!user || !passwordMatch)
      throw new NotFoundException('E-mail e/ou senha estão incorretos');
    const token = sign({ ...user }, process.env.JWT_SECRET);
    if (!passport)
      return {
        authenticateInputDto: {
          user: { ...user, password: undefined },
          authorization: {
            token: token,
          },
        },
      };
  }
}
