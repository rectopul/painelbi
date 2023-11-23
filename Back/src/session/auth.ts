import { PrismaService } from '../database/prisma.service'
import { GenerateTokenDTO } from 'src/modules/token.dto'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

type PasswordDTO = {
    password: string
    password_hash: string
}

@Injectable()
export class UserByToken {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async generateToken(user: GenerateTokenDTO) {
        const payload = { id: user.user.id, user: user.user }
        return this.jwtService.sign(payload, { secret: process.env.APP_SECRET })
    }

    async checkPassword(data: PasswordDTO) {
        try {
            return await bcrypt.compare(data.password, data.password_hash)
        } catch (error) {
            console.log(error)
        }

    }

    async checkToken(token: string) {
        if (!token) {
            throw new Error('Token not provided');
            //nada
        }

        try {
            const decoded = await this.jwtService.verifyAsync(token, { secret: process.env.APP_SECRET });

            const { jti } = decoded;

            const tokenRecord = await this.prisma.refreshToken.findFirst({
                where: {
                    id: jti,
                    revoked: false,
                },
            });

            if (!tokenRecord) {
                throw new Error('Token not exist or not valid');
            }

            return tokenRecord;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Token expired');
            } else {
                throw new Error('Token invalid');
            }
        }
    }
} 