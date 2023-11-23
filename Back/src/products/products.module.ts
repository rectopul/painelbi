import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserByToken } from 'src/session/auth';
import { PrismaService } from 'src/database/prisma.service';
import { ProductImagesController } from './product-images.contoller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProductsController, ProductImagesController],
  providers: [ProductsService, UserByToken, PrismaService, JwtService]
})
export class ProductsModule { }
