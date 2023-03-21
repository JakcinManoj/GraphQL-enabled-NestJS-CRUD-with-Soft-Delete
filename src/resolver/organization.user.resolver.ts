import { Args, Query, Mutation, Resolver, Int } from '@nestjs/graphql';
import { organizationUserType } from 'src/dto/organizationUser';
import { organizationUserService } from '../services/organizationUser/organization.user.service';
import { OrganizationUser } from 'src/entity/organization-user.entity';

@Resolver('OrganizationUser')
export class OrganizationUserResolver {
    constructor(private readonly OrganizationUserService: organizationUserService) {}
    @Query()
    getOrganizationUsers(): Promise<OrganizationUser[]> {
        return this.OrganizationUserService.getOrganizationUser();
    }
    
    @Mutation()
    createOrganizationUser(@Args('input') input: organizationUserType) {
        console.log(input);
        
        return this.OrganizationUserService.createOrgUser(input);
    }
}