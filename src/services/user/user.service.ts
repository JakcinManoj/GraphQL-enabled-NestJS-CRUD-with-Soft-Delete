import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from 'src/entity/user.entity';
import { userType } from 'src/dto/user.dto';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(user)
    public readonly orgUserRepository: Repository<user>,
  ) {}

  async getUser(): Promise<user[]> {
    return await this.orgUserRepository.find();
  }

  async createUser(input: userType): Promise<user> {
    console.log(input);
    const createUser = await this.orgUserRepository.save(input);
    return createUser;
  }
}
