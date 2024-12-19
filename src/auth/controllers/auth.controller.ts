import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { LocalAuthGuard } from '../local-auth.guard'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Realizar login e obter token de acesso' })
  @ApiResponse({
    status: 201,
    description: 'Login realizado com sucesso. Retorna o token JWT.',
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
