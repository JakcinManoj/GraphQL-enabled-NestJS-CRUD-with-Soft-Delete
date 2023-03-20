import { Args, Query, Mutation, Resolver, Int } from '@nestjs/graphql';
import { organizationType } from 'src/dto/organization';
import { Organization } from 'src/entity/organization.entity';
import { organizationService } from '../services/organization/organization.user.service';

@Resolver('Organization')
export class OrganizationResolver {
  constructor(private readonly OrganizationService: organizationService) {}
  @Query()
  getOrganizations(): Promise<Organization[]> {
    return this.OrganizationService.getOrganization();
  }


  @Mutation()
  createOrganization(@Args('input') input: organizationType) {
    return this.OrganizationService.createOrg(input);
  }

  @Mutation()
  updateOrganization(@Args('input') input: organizationType) {    
    return this.OrganizationService.updateOrg(input);
  }

  @Mutation()
  deleteOrganization(@Args('input') input: organizationType) {
    return this.OrganizationService.deleteOrg(input);
  }

  @Query()
  getOrganizationByName(@Args('organizationName') organizationName: string) {
    return this.OrganizationService.getOrgByName(organizationName);
  }

  @Mutation()
  softDeleteOrganization(@Args('input') input: organizationType) {
    return this.OrganizationService.softDeleteOrg(input);
  }
  
  @Mutation()
  restoreOrganization(@Args('input') input: organizationType) {
    return this.OrganizationService.restoreOrg(input);
  }
}