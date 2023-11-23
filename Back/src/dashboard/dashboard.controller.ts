import { Controller, Get, Res, Req, Render, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { UserByToken } from 'src/session/auth';
import { PrismaService } from 'src/database/prisma.service';
import { JsonWebToken } from 'src/modules/JsonWebToken';
import { ConsoleLogger } from '@nestjs/common/services';
import { DashboardService } from './dashboard.service';

@Controller('admin/dashboard')
export class DashboardController {
    constructor(
        private auth: UserByToken,
        private readonly prisma: PrismaService,
        private readonly jsonToken: JsonWebToken,
        private readonly service: DashboardService
    ) { }

    //@Render('pages/dashboard')
    @Get()
    async view(@Res() res, @Headers() headers): Promise<Object> {

        try {
            const [, token] = headers.authorization.split(' ')
            //const token = req.cookies.token || ''

            if (!token) throw new HttpException(`Token não encontrado`, HttpStatus.BAD_REQUEST)

            const { id: jti } = await this.auth.checkToken(token)

            if (! await this.jsonToken.checkToken(jti)) throw new HttpException(`Token não autenticado`, HttpStatus.BAD_REQUEST)

            const refreshToken = await this.prisma.refreshToken.findFirst({
                where: { id: jti },
                include: { User: { include: { UserImage: true } } }
            })

            const { resume_all, resume_day } = await this.service.getCampaigns()

            const accounts = refreshToken.User

            delete refreshToken.User.password_hash


            return res.json({
                pageClasses: `dashboard bg-default g-sidenav-show g-sidenav-pinned`,
                page: 'dashboard',
                title: `Dashboard Banese`,
                user: refreshToken.User,
                panel: true,
                userImage: refreshToken.User.UserImage?.name,
                campanhas: resume_all,
                campanhas_dia: resume_day,
                accounts
            })
        } catch (error) {
            console.log(`Error in dashboard: `, error)
            throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
        }
    }
}
