import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { UserByToken } from 'src/session/auth';
import { PrismaService } from 'src/database/prisma.service';
import { ImagesCategoryService } from './images_category.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, UserByToken, ImagesCategoryService, JwtService]
})
export class CategoryModule { }
