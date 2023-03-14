import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.list')
  list() {
    return this.usersService.list();
  }

  @MessagePattern('users.create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('users.read')
  read(@Payload('id', ParseIntPipe) id: number) {
    return this.usersService.read(id);
  }

  @MessagePattern('users.update')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('users.delete')
  delete(@Payload('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
