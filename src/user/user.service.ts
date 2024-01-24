import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as argon2 from 'argon2';
import { UpdateUserDto } from './dto/updateProfile.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(data: CreateUserDto) {
    const hash = await argon2.hash(data.password);
    const userData = {
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      hash,
    };
    return await this.databaseService.user.create({ data: userData });
  }

  async findUserByEmail(email: string) {
    return await this.databaseService.user.findUnique({ where: { email } });
  }

  async findUserById(id: string) {
    return await this.databaseService.user.findUnique({ where: { id } });
  }

  async updateUserWithId(id: string, data: UpdateUserDto) {
    return await this.databaseService.user.update({ where: { id }, data });
  }

  async updateUserAvatarWithId(id: string, avatarLink: string) {
    return await this.databaseService.user.update({
      where: { id },
      data: { avatar: avatarLink },
    });
  }
}
