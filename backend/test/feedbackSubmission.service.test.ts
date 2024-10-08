import { describe, expect, test } from "@jest/globals";
import { Feedback } from "../src/components/feedback/model";
import { feedbackSubmissionService } from "../src/components/feedbackSubmission/service";


describe("feedbackSubmission Service", () => {
    test("save", async () => {
        const name = "Test name";
        const email = "email@test.com";
        const feedback = "This is good";
        feedbackSubmissionService.save(name, email, feedback)

        const saved = await Feedback.findOne({
            where: {
                name: name,
                email: email,
                feedback: feedback,
            }
        })

        expect(saved).not.toBeNull()
        expect(saved?.id).not.toBeNull()
        expect(saved?.category).toBeNull()
    })
})