import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  list() {
    return this.client.send('users.list', {});
  }

  @Post()
  create(@Body() createUserDto: any) {
    return this.client.send('users.create', createUserDto);
  }

  @Get(':id')
  read(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('users.read', { id });
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: any) {
    return this.client.send('users.update', { id, ...updateUserDto });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('users.delete', { id });
  }
}
