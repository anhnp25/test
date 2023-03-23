import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Get()
  async findOne(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  @Post()
  async remove(): Promise<any> {
    const user: User = new User();
    user.firstName = 'Hello';
    user.lastName = 'Hello';
    user.isActive = true;
    await this.usersRepository.save(user);
    return { message: 'success' };
  }
}
