import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';

@Controller('facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) { }

  @Post()
  create(@Body() createFacebookDto: CreateFacebookDto) {
    return this.facebookService.create(createFacebookDto);
  }

  @Get()
  async findAll() {
    try {
      return await this.facebookService.findAll();
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('pages')
  async findAllPages() {
    try {
      return await this.facebookService.findAllPages()
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
  }
}
