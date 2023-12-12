import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    //Generar contraseña hasheada
    const hash = await argon.hash(dto.password);
    //Guardar usuario en la BD
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    delete user.hash;
    //regresar el usuario guardado.

    return user;
  }
  signin() {
    return { msg: 'I have signed in' };
  }
}
