import { HttpStatus, Injectable } from "@nestjs/common";
import { StudentActivityLogRepo } from "./student-activity-log.repository";
import { StudentActivityLogCreateDto, StudentActivityLogGetLatestByAccountAndLessonDto } from "./student-activity-log.dto";
import { StudentActivityLogEntity } from "./student-activity-log.entity";
import { InternalBackendService } from "../internal-service/internal-backend.service";

@Injectable()
export class StudentActivityLogService {
    constructor(
        private readonly internalBackendService: InternalBackendService,
        private readonly studentActivityLogRepo: StudentActivityLogRepo
    ) {}

    async getLatestByAccountAndLesson(payload: StudentActivityLogGetLatestByAccountAndLessonDto) {
        try {
            const studentActivityLog: StudentActivityLogEntity = await this.studentActivityLogRepo.getLatestRecordByAccountAndLessonMaterial({
                accountId: Number(payload.accountId),
                courseId: Number(payload.courseId),
                lessonId: Number(payload.lessonId),
                lessonMaterialId: Number(payload.lessonMaterialId)
            });

            return {
                status: HttpStatus.OK,
                message: 'Get student activity log by account and lesson success',
                data: studentActivityLog
            }
        }
        catch(e) {
            console.log('StudentActivityLogService getLatestByAccountAndLesson Err === ', e);

            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong, please try again',
                data: null,
                system_message: e.message
            }
        }
    }

    async create(payload: StudentActivityLogCreateDto) {
        try {
            //B1: Tim kiem activity log moi nhat
            const latestStudentActivityLog: StudentActivityLogEntity = await this.studentActivityLogRepo.getLatestRecordByAccountAndLessonMaterial({
                accountId: Number(payload.accountId),
                courseId: Number(payload.courseId),
                lessonId: Number(payload.lessonId),
                lessonMaterialId: Number(payload.lessonMaterialId)
            });

            //B2: Tao du lieu cap nhat
            let studentActivityLog: StudentActivityLogEntity = new StudentActivityLogEntity();
            studentActivityLog.accountId = payload.accountId;
            studentActivityLog.courseId = payload.courseId;
            studentActivityLog.lessonId = payload.lessonId;
            studentActivityLog.lessonMaterialId = payload.lessonMaterialId;
            studentActivityLog.requiredDuration = payload?.requiredDuraton || latestStudentActivityLog.requiredDuration;
            studentActivityLog.viewedDuration = (latestStudentActivityLog?.viewedDuration || 0) + (payload?.viewedDuration || 15);
            studentActivityLog.isCompleted = studentActivityLog.requiredDuration <= studentActivityLog.viewedDuration ? true : false;
            studentActivityLog = await this.studentActivityLogRepo.insert(studentActivityLog);

            //B3: Gui du lieu sang BE khi hoan thanh lan dau tien
            if (!latestStudentActivityLog?.isCompleted && studentActivityLog?.isCompleted) {
                this.internalBackendService.updateLearnLessonMaterialProcess({
                    accountId: studentActivityLog.accountId,
                    courseId: studentActivityLog.courseId,
                    lessonId: studentActivityLog.lessonId,
                    lessonMaterialId: studentActivityLog.lessonMaterialId,
                    viewedDuration: studentActivityLog.viewedDuration
                });
            }

            return {
                status: HttpStatus.OK,
                message: 'Get student activity log by account and lesson success',
                data: studentActivityLog
            }
        }
        catch(e) {
            console.log('StudentActivityLogService getLatestByAccountAndLesson Err === ', e);

            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong, please try again',
                data: null,
                system_message: e.message
            }
        }
    }
}