import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'student_activity_logs' })
export class StudentActivityLogEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id?: number

    @Column({ type: 'int', name: 'account_id', nullable: false })
    accountId: number

    @Column({ type: 'int', name: 'course_id', nullable: false })
    courseId: number

    @Column({ type: 'int', name: 'lesson_id', nullable: false })
    lessonId: number

    @Column({ type: 'int', name: 'lesson_material_id', nullable: false })
    lessonMaterialId: number

    @Column({ type: 'tinyint', name: 'is_completed', nullable: false })
    isCompleted: boolean

    //This field is second
    @Column({ type: 'int', name: 'required_duration', nullable: false })
    requiredDuration: number

    //This field is second
    @Column({ type: 'int', name: 'viewed_duration', nullable: false })
    viewedDuration: number

    @Column({ type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date
}