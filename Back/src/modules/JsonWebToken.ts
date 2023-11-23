import * as crypto from 'crypto'
import { PrismaService } from '../database/prisma.service';
import { GenerateTokenDTO } from './token.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonWebToken {
    constructor(private readonly jwt: JwtService) { }

    private prismaClient = new PrismaService()

    private generateAccessToken(data: GenerateTokenDTO) {
        if (!process.env.APP_SECRET) throw new Error(`Please create the app-secret`)

        console.log(`data recebido`, data)

        return this.jwt.sign({ userId: data.user.id }, { secret: process.env.APP_SECRET })
    }

    private generateRefreshToken(data: GenerateTokenDTO) {
        const payload = {
            userId: data.user.id,
            jti: data.jti
        }

        return this.jwt.sign(payload, { secret: process.env.APP_SECRET })
    }

    generateTokens(data: GenerateTokenDTO): any {
        const accessToken = this.generateAccessToken(data);
        const refreshToken = this.generateRefreshToken(data);

        return {
            accessToken,
            refreshToken,
        };
    }

    hashToken(token: string) {
        return crypto.createHash('sha512').update(token).digest('hex');
    }

    async checkToken(token) {
        try {

            const checkToken = await this.prismaClient.refreshToken.findFirst({
                where: {
                    id: token,
                    revoked: false
                }
            })

            if (!checkToken) return false
            else return true
        } catch (error) {
            console.log(error)
        }
    }
}