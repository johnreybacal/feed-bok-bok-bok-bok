import { describe, expect, it, jest } from "@jest/globals";
import { Feedback } from "../src/components/feedback/model";
import { feedbackSubmissionService } from "../src/components/feedbackSubmission/service";

jest.mock('sequelize');

describe('FeedbackSubmissionService', () => {
    describe('save', () => {
        it('should create a new feedback', async () => {
            const mockFeedback = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                feedback: 'This is a great product',
            };

            jest.spyOn(Feedback, 'create').mockResolvedValueOnce(mockFeedback);

            const result = await feedbackSubmissionService.save(
                mockFeedback.name,
                mockFeedback.email,
                mockFeedback.feedback
            );

            setTimeout(() => {
                expect(result.id).not.toBeNull();
                expect(result.name).toBe(mockFeedback.name);
                expect(result.email).toBe(mockFeedback.email);
                expect(result.feedback).toBe(mockFeedback.feedback);
                expect(result.category).toBeUndefined();
            }, 100);
        });
    });
});