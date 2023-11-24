import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/database/prisma.service';
import { CommentsOcult } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = await this.prisma.commentsOcult.create({ data: createCommentDto });
      return comment;
    } catch (error) {
      if (error.name && error.name == `PrismaClientKnownRequestError`) {
        if (error.code && error.code == `P2002`) {
          throw new Error(`Você está tentando enviar atualizar um dado que não pode ser repetido`)
        }
      }
      throw new Error(error?.message || error?.error)
    }
  }

  async findAll(): Promise<CommentsOcult[]> {
    try {
      const comments = await this.prisma.commentsOcult.findMany()

      return comments
    } catch (error) {
      throw new Error(error?.message || error?.error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
