import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(@Inject('USERS_SERVICE') private readonly client: ClientKafka) {}

  onModuleInit() {
    const requestPatterns = ['users.list', 'users.create', 'users.read', 'users.update', 'users.delete'];
    requestPatterns.forEach(async pattern => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Get()
  list() {
    return this.client.send('users.list', {});
  }

  @Post()
  create(@Body() createUserDto: any) {
    return this.client.send('users.create', createUserDto);
  }

  @Get(':id')
  async read(@Param('id', ParseIntPipe) id: number) {
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
