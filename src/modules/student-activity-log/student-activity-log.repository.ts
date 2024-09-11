import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentActivityLogEntity } from "./student-activity-log.entity";
import { Repository } from "typeorm";

@Injectable()
export class StudentActivityLogRepo {
    constructor(
        @InjectRepository(StudentActivityLogEntity) private readonly studentActivityLogRepo: Repository<StudentActivityLogEntity>
    ) {}

    async getLatestRecordByAccountAndLessonMaterial(payload: {
        accountId: number,
        courseId: number,
        lessonId: number,
        lessonMaterialId: number
    }): Promise<StudentActivityLogEntity> {
        return this.studentActivityLogRepo.findOne({
            where: {
                accountId: payload.accountId,
                courseId: payload.courseId,
                lessonId: payload.lessonId,
                lessonMaterialId: payload.lessonMaterialId
            },
            order: {
                createdAt: 'desc'
            }
        });
    }

    async insert(insertData: StudentActivityLogEntity): Promise<StudentActivityLogEntity> {
        return this.studentActivityLogRepo.save(insertData);
    }
}