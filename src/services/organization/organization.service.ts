import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from 'src/entity/organization.entity';
import { organizationType } from 'src/dto/organization';
import { OrganizationUser } from 'src/entity/organization-user.entity';
import { pick } from 'lodash';

@Injectable()
export class organizationService {
  constructor(
    @InjectRepository(Organization)
    public orgRepository: Repository<Organization>,
    @InjectRepository(OrganizationUser)
    public orgUserRepository: Repository<OrganizationUser>,
  ) {}

  async getOrganization(): Promise<Organization[]> {
    return await this.orgRepository.find();
  }

  async createOrg(input: organizationType): Promise<Organization> {
    // check if orgUserRepository has email column
    if (this.orgUserRepository.metadata.hasColumnWithPropertyPath('email')) {
      //Get the realted row from orgUserRepository
      const orgUser = await this.orgUserRepository.findOne({
        where: { email: input.email },
      })

      console.log(orgUser);
      
      //Check if the email is already present in the orgUserRepository
      
      const createUser = await this.orgRepository.save({
        ...pick(input, ['organizationName', 'industry', 'organizationSize', 'email']),
        organizationUser: orgUser,
      });
      console.log(createUser);
      return createUser;
    }
    
  }

  async updateOrg(input: organizationType): Promise<string> {
    const updateUser = await this.orgRepository.findOne({
      where: { organizationName: input.organizationName },
    });
    if (!updateUser) {
      return 'User not found';
    }
    updateUser.industry = input.industry;
    updateUser.organizationSize = input.organizationSize;
    await this.orgRepository.save(updateUser);
    return 'updated sucessfully';
  }

  async deleteOrg(input: organizationType): Promise<string> {
    const deleteUser = await this.orgRepository.findOne({
      where: { organizationName: input.organizationName },
    });
    if (!deleteUser) {
      return 'User not found';
    }
    await this.orgRepository.remove(deleteUser);
    return 'deleted sucessfully';
  }

  async getOrgByName(organizationName: string): Promise<Organization> {
    const getOrgByName = await this.orgRepository.findOne({
      where: { organizationName },
    });
    return getOrgByName;
  }

  async softDeleteOrg(input: organizationType): Promise<string> {
    const softDeleteUser = await this.orgRepository.findOne({
      where: { organizationName: input.organizationName },
    });
    if (!softDeleteUser) {
      return 'User not found';
    }
    softDeleteUser.deletedAt = new Date();
    await this.orgRepository.save(softDeleteUser);
    return 'soft deleted sucessfully';
  }

  async restoreOrg(input: organizationType): Promise<string> {
    const restoreOrg = await this.orgRepository.restore({
      organizationName: input.organizationName,
    });

    if (!restoreOrg) {
      return 'Organization not found';
    }

    return 'Organization restored successfully';
  }
}
