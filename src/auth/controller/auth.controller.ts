import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticateInputDTO } from '../dtos/authenticate-input.dto';
import { AuthUseCase } from '../use-cases/auth/auth.usecase';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateUserOutputDTO } from '../dtos/authenticate-output.dto';
import { ApiNormalResponse } from 'src/common/decorators/api-normal-response.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authUserCase: AuthUseCase) {}

  @Post()
  @HttpCode(200)
  @ApiNormalResponse(AuthenticateUserOutputDTO)
  async auth(
    @Body() authenticateDto: AuthenticateInputDTO,
  ): Promise<AuthenticateUserOutputDTO> {
    const { authenticateInputDto } =
      await this.authUserCase.execute(authenticateDto);
    return authenticateInputDto;
  }
}
