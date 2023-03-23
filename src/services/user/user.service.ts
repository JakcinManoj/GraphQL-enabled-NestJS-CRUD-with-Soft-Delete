import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from 'src/entity/user.entity';
import { userType } from 'src/dto/user.dto';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(user)
    public readonly userRepository: Repository<user>,
  ) {}

  async getUser(): Promise<user[]> {
    return await this.userRepository.find();
  }

  async createUser(input: userType): Promise<user> {
    const createUser = await this.userRepository.save(input);
    
    return createUser;
  }
}
