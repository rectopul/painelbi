import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserByToken } from 'src/session/auth';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly auth: UserByToken) { }

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const authorization = req.headers.authorization || '';

    const [, token] = authorization.split(' ');

    try {
      await this.auth.checkToken(token);
      next();
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  }
}