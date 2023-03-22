import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationUser } from './entity/organization-user.entity';
import { Organization } from './entity/organization.entity';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationUserModule } from './organizationUser/organizationUser.module';



@Module({
  imports: [TypeOrmModule.forRoot({
    keepConnectionAlive: true,
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: [Organization, OrganizationUser],
  }),OrganizationModule, OrganizationUserModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
