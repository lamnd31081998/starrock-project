import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class InternalBackendService {
    private readonly backend_service_url = process.env.BE_SERVICE_URL;

    constructor() {}

    async updateStudentLearnLessonMaterialProcess(data: {
        accountId: number,
        courseId: number,
        lessonId: number,
        lessonMaterialId: number,
        viewedDuration: number
    }) {
        return axios.post(
            `${this.backend_service_url}/students/update-learn-lesson-material-process`,
            data,
            {
                responseType: 'json'
            }
        )
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log('InternalBackendService updateStudentLearnLessonMaterialProcess Err === ', err?.response?.data || err);
                return null;
            })
    }
}