import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './entity/user.entity';
import { AccessDenied, EntityNotFound } from 'src/errors';

@Injectable()
export class UserService {
  constructor() {
  }
  users: UserEntity[] = [];
  create(createUserDto: CreateUserDto): UserEntity {
    const id = uuidv4();
    const date = Date.now();
    const user: UserEntity = new UserEntity({
      id,
      ...createUserDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
    });
    this.users.push(user);

    return user;
  }

  findAll(): UserEntity[] {
    return this.users;
  }

  findOne(id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new EntityNotFound;
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): UserEntity {
    const user = this.findOne(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new AccessDenied;
    }

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    return user;
  }

  remove(id: string) {
    const user = this.findOne(id);

    this.users = this.users.filter((usr) => usr.id !== user.id);
  }
}