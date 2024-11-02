import { ZodError, ZodIssue } from "zod";
import { validationErrorFormatter } from "../../../src/formatters/validation-error-formatter";

describe("validationErrorFormatter", () => {
    it("should format ZodError issues correctly", () => {
        const issues: ZodIssue[] = [
            {
                path: ["field1"],
                message: "Field1 is required",
                code: "custom",
            },
            {
                path: ["field2"],
                message: "Field2 must be a string",
                code: "custom",
            },
        ];

        const zodError = new ZodError(issues);

        const result = validationErrorFormatter(zodError);

        expect(result).toEqual([
            "field1: Field1 is required",
            "field2: Field2 must be a string",
        ]);
    });
});