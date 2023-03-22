import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { organizationUser } from 'src/entity/organization.user.entity';


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
        TypeOrmModule.forFeature([organizationUser]),
    ],
    controllers: [],
    providers: [],
})

export class organizationUserModule {}