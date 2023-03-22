import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { user } from './entity/user.entity';
import { Organization } from './entity/organization.entity';
import { OrganizationModule } from './Modules/organization/organization.module';
import { UserModule } from './Modules/user/user.module';
import { organizationUser } from './entity/organization.user.entity';
import { organizationUserModule } from './Modules/organizationUser/organizationUser.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      synchronize: true,
      logging: true,
      entities: [Organization, user, organizationUser],
    }),
    OrganizationModule,
    UserModule,
    organizationUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
