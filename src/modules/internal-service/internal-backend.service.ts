import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class InternalBackendService {
    private readonly backend_service_url = process.env.BE_SERVICE_URL;

    constructor() {}

    async updateLearnLessonMaterialProcess(data: {
        accountId: number,
        courseId: number,
        lessonId: number,
        lessonMaterialId: number,
        viewedDuration: number
    }) {
        return axios.post(
            `${this.backend_service_url}/student/update-learn-lesson-material-process`,
            data,
            {
                responseType: 'json'
            }
        )
            .then(res => {
                return true;
            })
            .catch(err => {
                console.log('InternalBackendService updateLearnLessonMaterialProcess Err === ', err?.response?.data || err);
                return false;
            })
    }
}