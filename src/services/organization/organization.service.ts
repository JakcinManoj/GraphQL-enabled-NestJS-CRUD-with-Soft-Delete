import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from 'src/entity/organization.entity';
import { organizationType } from 'src/dto/organization.dto';
import { user } from 'src/entity/user.entity';
import { pick } from 'lodash';
import { organizationUser } from 'src/entity/organization.user.entity';

@Injectable()
export class organizationService {
  constructor(
    @InjectRepository(Organization)
    public orgRepository: Repository<Organization>,
    @InjectRepository(user)
    public userRepository: Repository<user>,
    @InjectRepository(organizationUser)
    public orgUserRepository: Repository<organizationUser>,
  ) {}

  async getOrganization(): Promise<Organization[]> {
    return await this.orgRepository.find();
  }

  async createOrg(input: organizationType): Promise<Organization | string> {
    // check if userRepository has email column
    if (this.userRepository.metadata.hasColumnWithPropertyPath('email')) {
      //Get the realted row from userRepository
      const orgUser = await this.userRepository.findOne({
        where: { email: input.email },
      });

      console.log(orgUser);

      //Check if the email is already present in the userRepository

      const createUser = await this.orgRepository.save({
        ...pick(input, [
          'organizationName',
          'industry',
          'organizationSize',
          'email',
        ]),
        organizationUser: orgUser,
      });

      // const userOrganization = await this.orgUserRepository.save({
      //   ...pick(input,['email','organizationName'])},
      // }),
      const userOrganization = await this.orgUserRepository.save({
        organization: createUser,
        user: orgUser,
      })
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
