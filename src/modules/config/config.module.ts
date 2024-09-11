import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfig } from "./database/database.config";
import { ConfigModule } from "@nestjs/config";
import { StudentActivityLogEntity } from "../student-activity-log/student-activity-log.entity";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfig
        }),
        TypeOrmModule.forFeature([
            StudentActivityLogEntity
        ])
    ],
    controllers: [],
    providers: [],
    exports: [
        ConfigModule,
        TypeOrmModule
    ]
})

export class CustomConfigModule {}