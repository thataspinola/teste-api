import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mockToken'),
}

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('validateUser', () => {
    it('should return user data if username and password are correct', async () => {
      const result = await service.validateUser('admin', 'admin')
      expect(result).toEqual({ userId: 1, username: 'admin' })
    })

    it('should return null if username or password are incorrect', async () => {
      const result = await service.validateUser('user', 'wrongpassword')
      expect(result).toBeNull()
    })
  })

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { username: 'admin', userId: 1 }
      const result = await service.login(user)
      expect(result).toEqual({ access_token: 'mockToken' })
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: 'admin',
        sub: 1,
      })
    })
  })
})
