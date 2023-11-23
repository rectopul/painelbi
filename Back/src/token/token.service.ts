import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { UserByToken } from 'src/session/auth';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly auth: UserByToken,
    private readonly prisma: PrismaService
  ) { }

  create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
  }

  async regenerate(payload: CreateTokenDto) {
    try {
      const user = await this.prisma.user.findFirst({ where: { user: payload.user } })
      const jti = (await this.prisma.refreshToken.findFirst({ where: { userId: user.id } })).hashedToken
      const token = await this.auth.generateToken({ jti, user })
      return token
    } catch (error) {
      throw new Error(`Error in renew token`)
    }
  }

  findAll() {
    return `This action returns all token`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
