import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticateInputDto } from '../dtos/authenticate-input.dto';
import { AuthUseCase } from '../use-cases/auth/auth.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUserCase: AuthUseCase) {}

  @Post()
  @HttpCode(200)
  async auth(@Body() authenticateDto: AuthenticateInputDto) {
    const { authenticateInputDto } =
      await this.authUserCase.execute(authenticateDto);
    return authenticateInputDto;
  }
}
