import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 9030),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            entities: ['dist/**/*.entity{.ts,.js}'],
            // migrationsTableName: 'migrations',
            // migrations: ['dist/migrations/*{.ts,.js}'],
            extra: {
                charset: 'utf8mb4_unicode_ci',
            },
            synchronize: false,
            // logging: true
        };
    }
}

dotenvConfig({ path: '.env' });
const config = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 9030),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
    synchronize: true,
}
export const connectionSource = new DataSource(config as DataSourceOptions);
