import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationUser } from 'src/entity/organization-user.entity';
import { join } from 'path';
import { OrganizationUserResolver } from 'src/resolver/organization.user.resolver';
import { organizationUserService } from 'src/services/organizationUser/organization.user.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    TypeOrmModule.forFeature([OrganizationUser]),
  ],
  controllers: [],
  providers: [OrganizationUserResolver, organizationUserService],
})
export class OrganizationModule {}
