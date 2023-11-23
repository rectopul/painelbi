import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { UserByToken } from 'src/session/auth';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TokenController],
  providers: [TokenService, UserByToken, PrismaService, JwtService]
})
export class TokenModule { }
