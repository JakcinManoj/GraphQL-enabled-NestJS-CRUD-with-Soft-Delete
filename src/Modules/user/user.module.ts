import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from 'src/entity/user.entity';
import { join } from 'path';
import { userResolver } from 'src/resolver/user.resolver';
import { userService } from 'src/services/user/user.service';

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
    TypeOrmModule.forFeature([user]),
  ],
  controllers: [],
  providers: [userResolver, userService],
})
export class UserModule {}
