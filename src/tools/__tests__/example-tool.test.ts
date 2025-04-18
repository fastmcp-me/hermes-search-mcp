import exampleTool from "../example-tool";

jest.mock("../../config/env", () => ({
  getConfig: jest.fn().mockReturnValue({
    requiredVar: "test-value",
  }),
}));

describe("exampleTool", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle successful operation", async () => {
    const result = await exampleTool("param1", "param2", { option1: "test" });
    expect(result).toBe("Operation successful");
  });

  it("should throw error when required options are missing", async () => {
    await expect(
      exampleTool("param1", "param2", {})
    ).rejects.toThrow("Either option1 or option2 must be provided");
  });
}); 