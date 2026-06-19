import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginPage from "../src/pages/LoginPage";

describe("LoginPage", () => {
  it("renders a Google sign-in link", () => {
    render(<LoginPage />);
    expect(screen.getByText(/continue with google/i)).toBeInTheDocument();
  });
});
