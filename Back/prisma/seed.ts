import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { JsonWebToken } from '../src/modules/JsonWebToken'
import { JwtService } from '@nestjs/jwt'
const { v4: uuidv4 } = require('uuid')


// @ts-ignore
const prisma = new PrismaClient()

const jwtService = new JwtService()

const jwt = new JsonWebToken(jwtService)

async function main() {
  const jti = uuidv4()

  const tester = await prisma.user.upsert({
    where: { user: `tester` },
    update: {},
    create: {
      type: `super`,
      user: `tester`,
      name: `Tester`,
      password_hash: bcrypt.hashSync(`123mudar`, 12)
    }
  })

  console.log(`user criado`, tester)

  const { accessToken, refreshToken } = jwt.generateTokens({ jti, user: tester })

  return await prisma.refreshToken.create({
    data: {
      id: jti,
      hashedToken: jwt.hashToken(refreshToken),
      userId: tester.id
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })