import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationUser } from 'src/entity/organization-user.entity';
import { organizationUserType } from 'src/dto/organizationUser';
import { log } from 'console';

@Injectable()
export class organizationUserService {
  constructor(
    @InjectRepository(OrganizationUser)
    public readonly orgUserRepository: Repository<OrganizationUser>,
  ) {}

  async getOrganizationUser(): Promise<OrganizationUser[]> {
    return await this.orgUserRepository.find();
  }

  async createOrgUser(input: organizationUserType): Promise<OrganizationUser> {
    console.log(input);
    const createUser = await this.orgUserRepository.save(input);
    return createUser;
  }
}
