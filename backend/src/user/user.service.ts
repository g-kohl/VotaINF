import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async validateUser(username: string, password: string) {
    return this.userRepository.findOne({
      where: { username, password }
    });
  }
}
