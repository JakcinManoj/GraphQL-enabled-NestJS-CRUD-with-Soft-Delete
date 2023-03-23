import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { organizationUser } from 'src/entity/organization.user.entity';
import { organizationUserService } from 'src/services/organizationUser/organizationUser.service';
import { organizationUserResolver } from 'src/resolver/organizationUser.resolver';
import { user } from 'src/entity/user.entity';
import { Organization } from 'src/entity/organization.entity';



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
        TypeOrmModule.forFeature([organizationUser, user, Organization]),
    ],
    controllers: [],
    providers: [organizationUserResolver, organizationUserService],
})

export class organizationUserModule {}