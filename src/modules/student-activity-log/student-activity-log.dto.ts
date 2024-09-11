import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from "class-validator";

export class StudentActivityLogGetLatestByAccountAndLessonDto {
    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    accountId: string

    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    courseId: string

    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    lessonId: string

    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    lessonMaterialId: string
}

export class StudentActivityLogCreateDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    accountId: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    courseId: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    lessonId: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    lessonMaterialId: number

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    requiredDuraton: number

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    viewedDuration: number
}