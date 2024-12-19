import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from '../services/auth.service'
import { ExecutionContext } from '@nestjs/common'
import { LocalAuthGuard } from '../local-auth.guard'

const mockAuthService = {
  login: jest.fn().mockResolvedValue({ access_token: 'mockToken' }),
}

const mockLocalAuthGuard = {
  canActivate: jest.fn((context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    request.user = { username: 'admin', userId: 1 }
    return true
  }),
}

describe('AuthController', () => {
  let controller: AuthController
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue(mockLocalAuthGuard)
      .compile()

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('login', () => {
    it('should return an access token', async () => {
      const req = { user: { username: 'admin', userId: 1 } }
      const result = await controller.login(req)

      expect(result).toEqual({ access_token: 'mockToken' })
      expect(service.login).toHaveBeenCalledWith({
        username: 'admin',
        userId: 1,
      })
    })
  })
})
