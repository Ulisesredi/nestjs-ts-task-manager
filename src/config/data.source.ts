import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV}.local`
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: "postgres",
  host: configService.get("DB_HOST"),
  port: parseInt(configService.get("DB_PORT") || "5432"),
  username: configService.get("DB_USER"),
  password: configService.get("DB_PASSWORD"),
  database: configService.get("DB_NAME"),
  synchronize: false,
  logging: false,
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + "/../**/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../../migrations/*{.ts,.js}"]
};

export const AppDS = new DataSource(DataSourceConfig);
