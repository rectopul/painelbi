import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginController } from './login/login.controller';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { CategoryController } from './category/category.controller';
import { UserByToken } from './session/auth';
import { PrismaService } from './database/prisma.service';
import { CategoryService } from './category/category.service';
import { ImagesCategoryService } from './category/images_category.service';
import { AuthenticationMiddleware } from './authentication/authentication.middleware';
import { ProductsController } from './products/products.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenModule } from './token/token.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { PlanilhaModule } from './planilha/planilha.module';
import { CronjobsModule } from './cronjobs/cronjobs.module';
import { CampaignModule } from './campaign/campaign.module';
import { FacebookModule } from './facebook/facebook.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: {
        expiresIn: '1h'
      }
    }),
    ScheduleModule.forRoot(),
    SessionModule,
    DashboardModule,
    UsersModule,
    ProductsModule,
    CategoryModule,
    TokenModule,
    PlanilhaModule,
    CronjobsModule,
    CampaignModule,
    FacebookModule,
    CommentsModule
  ],
  controllers: [AppController, LoginController, CategoryController],
  providers: [AppService, UserByToken, PrismaService, CategoryService, ImagesCategoryService, JwtService],
  exports: [UserByToken, JwtService, PrismaService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(CategoryController, ProductsController, DashboardController)
  }
}
