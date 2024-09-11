import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StudentActivityLogService } from "./student-activity-log.service";
import { StudentActivityLogCreateDto, StudentActivityLogGetLatestByAccountAndLessonDto } from "./student-activity-log.dto";
import { Response } from "express";

@ApiTags('student-activity-log')
@Controller('student-activity-log')
export class StudentActivityLogController {
    constructor(
        private readonly studentActivityLogService: StudentActivityLogService
    ) {}

    @Get('latest-info')
    async getLatestByAccountAndLesson(
        @Query() payload: StudentActivityLogGetLatestByAccountAndLessonDto,
        @Res() response: Response
    ) {
        const result = await this.studentActivityLogService.getLatestByAccountAndLesson(payload);
        return response.status(result.status).json(result);
    }

    @Post()
    async create(
        @Body() payload: StudentActivityLogCreateDto,
        @Res() response: Response
    ) {
        const result = await this.studentActivityLogService.create(payload);
        return response.status(result.status).json(result);
    }
}