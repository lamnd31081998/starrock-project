import { Module } from "@nestjs/common";
import { InternalBackendService } from "./internal-backend.service";

@Module({
    imports: [],
    controllers: [],
    providers: [
        InternalBackendService
    ],
    exports: [
        InternalBackendService
    ]
})

export class InternalServiceModule {}