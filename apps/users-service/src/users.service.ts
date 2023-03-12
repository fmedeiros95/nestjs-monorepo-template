import { UserEntity } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {}

  list() {
    return this.usersRepository.find();
  }

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async read(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) throw new Error('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.read(id);
    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.read(id);
    return this.usersRepository.remove(user);
  }
}
