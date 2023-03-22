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
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD ,
      database: process.env.DB_DATABASE,
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
