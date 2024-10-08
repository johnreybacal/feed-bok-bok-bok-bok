import { Feedback } from "../feedback/model";

class Service {
    async save(name: string, email: string, feedback: string) {
        return await Feedback.create({
            name,
            email,
            feedback
        })
    }
}

export const feedbackSubmissionService = new Service()