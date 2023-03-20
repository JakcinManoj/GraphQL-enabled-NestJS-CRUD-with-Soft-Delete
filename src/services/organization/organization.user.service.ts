import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from 'src/entity/organization.entity';
import { organizationType } from 'src/dto/organization';

@Injectable()
export class organizationService {
  constructor(
    @InjectRepository(Organization)
    public readonly orgRepository: Repository<Organization>,
  ) {}

  async getOrganization(): Promise<Organization[]> {
    return await this.orgRepository.find();
  }

  async createOrg(input: organizationType): Promise<Organization> {
    const createUser = await this.orgRepository.save(input);
    return createUser;
  }

  async updateOrg(input:organizationType): Promise<string> {
    const updateUser = await this.orgRepository.findOne({where: {organizationName :input.organizationName}});
    if(!updateUser){
      return 'User not found';
    }
    updateUser.industry = input.industry;
    updateUser.organizationSize = input.organizationSize;
    await this.orgRepository.save(updateUser);
    return 'updated sucessfully';
  }

  async deleteOrg(input:organizationType): Promise<string> {
    const deleteUser = await this.orgRepository.findOne({where: {organizationName :input.organizationName}});
    if(!deleteUser){
      return 'User not found';
    }
    await this.orgRepository.remove(deleteUser);
    return 'deleted sucessfully';
  }

  async getOrgByName(organizationName: string): Promise<Organization> {
    const getOrgByName = await this.orgRepository.findOne({ where: { organizationName } });
    return getOrgByName
  }

  async softDeleteOrg(input:organizationType): Promise<string> {
    const softDeleteUser = await this.orgRepository.findOne({where: {organizationName :input.organizationName}});
    if(!softDeleteUser){
      return 'User not found';
    }
    softDeleteUser.deletedAt = new Date();
    await this.orgRepository.save(softDeleteUser);
    return 'soft deleted sucessfully';
  }

  async restoreOrg(input:organizationType): Promise<string> {
    const restoreUser = await this.orgRepository.findOne({where: {organizationName :input.organizationName}});
    if(!restoreUser){
      return 'User not found';
    }
    restoreUser.deletedAt = null;
    await this.orgRepository.restore(restoreUser);
    return 'restore sucessfully';
  }
    
  }
