import { Module } from "@nestjs/common";
import { StudentActivityLogController } from "./student-activity-log.controller";
import { StudentActivityLogService } from "./student-activity-log.service";
import { StudentActivityLogRepo } from "./student-activity-log.repository";
import { CustomConfigModule } from "../config/config.module";
import { InternalServiceModule } from "../internal-service/internal-service.module";

@Module({
    imports: [
        CustomConfigModule,
        InternalServiceModule
    ],
    controllers: [
        StudentActivityLogController
    ],
    providers: [
        StudentActivityLogService,
        StudentActivityLogRepo
    ],
    exports: [
        StudentActivityLogRepo
    ]
})

export class StudentActivityLogModule {}