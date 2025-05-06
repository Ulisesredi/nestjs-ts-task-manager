import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "@/User/user.module";
import { DataSourceConfig } from "./config/data.source";

import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectModule } from "./project/project.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UserModule,
    ProjectModule,
    AuthModule
  ]
})
export class AppModule {}
