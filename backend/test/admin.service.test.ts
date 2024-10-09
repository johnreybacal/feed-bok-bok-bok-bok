import { describe, expect, it, jest } from "@jest/globals";
import { adminService } from "../src/components/admin/service";
import { Feedback } from "../src/components/feedback/model";

jest.mock("sequelize");

const data: Partial<Feedback>[] = [
    {
        id: "df7fd32e-bab2-477b-a239-185f676c888b",
        name: "John Doe",
        email: "john.doe@example.com",
        feedback: "This is a great product",
        category: "positive",
        createdAt: new Date("2023-01-01")
    },
    {
        id: "0eae97e2-b54f-4fed-8500-903d131daefa",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        feedback: "I hate this product",
        category: "negative",
        createdAt: new Date("2024-01-01")
    },
]

describe("AdminService", () => {
    describe("list", () => {
        it("should return all feedbacks without filters", async () => {

            jest.spyOn(Feedback, "findAndCountAll").mockResolvedValueOnce({
                count: data.length as any,
                rows: data as any[],
            });

            const params = {
                page: 1,
                pageSize: 10,
            };

            const result = await adminService.list(params);

            expect(result.count).toEqual(data.length)
            expect(result.rows).toEqual(data);
        });

        it("should filter by category", async () => {
            const filtered = data.filter((row) => row.category === "positive")
            jest.spyOn(Feedback, "findAndCountAll").mockResolvedValueOnce({
                count: filtered.length as any,
                rows: filtered as any[],
            });

            const params = {
                category: "positive",
                page: 1,
                pageSize: 10,
            };

            const result = await adminService.list(params);

            expect(result.count).toEqual(filtered.length)
            expect(result.rows).toEqual(filtered);
        });

    });
});