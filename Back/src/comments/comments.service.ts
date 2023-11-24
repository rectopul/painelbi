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

  async findOne(id: number): Promise<CommentsOcult> {
    try {
      const comment = await this.prisma.commentsOcult.findFirst({ where: { id } })

      if (!comment) throw new Error(`Comentário não disponível`)

      return comment
    } catch (error) {
      throw new Error(error?.message || error?.error)
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<CommentsOcult> {
    try {
      const comment = await this.prisma.commentsOcult.findFirst({ where: { id } })

      if (!comment) throw new Error(`Comentário não disponível`)

      const newComment = await this.prisma.commentsOcult.update({ data: updateCommentDto, where: { id } })

      return newComment
    } catch (error) {
      throw new Error(error?.message || error?.error)
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const comment = await this.prisma.commentsOcult.findFirst({ where: { id } })

      if (!comment) throw new Error(`Comentário não disponível`)

      await this.prisma.commentsOcult.delete({ where: { id } })

      return true
    } catch (error) {
      throw new Error(error?.message || error?.error)
    }
  }
}
