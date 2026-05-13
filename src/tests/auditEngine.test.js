import { auditEngine } from "../utils/auditEngine.js";

describe("AI Spend Audit Engine", () => {

  test("ChatGPT Plus → Go downgrade", () => {
    const result = auditEngine([
      { tool: "chatgpt", plan: "plus", seats: 1, useCase: "coding" }
    ]);

    expect(result.results[0].recommendation)
      .toBe("Downgrade to ChatGPT Go");
  });

  test("Copilot ProPlus → Pro downgrade", () => {
    const result = auditEngine([
      { tool: "copilot", plan: "proplus", seats: 1 }
    ]);

    expect(result.results[0].recommendation)
      .toBe("Downgrade to Copilot Pro");
  });

  test("Claude Free team upgrade", () => {
    const result = auditEngine([
      { tool: "claude", plan: "free", seats: 3 }
    ]);

    expect(result.results[0].recommendation)
      .toBe("Upgrade to Claude Pro");
  });

  test("Cursor Pro → Hobby downgrade", () => {
    const result = auditEngine([
      { tool: "cursor", plan: "pro", seats: 1 }
    ]);

    expect(result.results[0].recommendation)
      .toBe("Downgrade to Cursor Hobby");
  });

  test("No optimization case", () => {
    const result = auditEngine([
      { tool: "gemini", plan: "aiplus", seats: 1 }
    ]);

    expect(result.results[0].recommendation)
      .toBe("Current plan looks efficient");
  });

});