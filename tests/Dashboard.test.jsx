import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ReviewerDashboard from "../src/pages/ReviewerDashboard";
import { reviewerService } from "../src/services/reviewerService";

vi.mock("../src/hooks/useAuth", () => ({
  useAuth: () => ({ user: { name: "Reviewer One", role: "REVIEWER" } }),
}));

vi.mock("../src/services/reviewerService", () => ({
  reviewerService: {
    listAssigned: vi.fn(),
    approve: vi.fn(),
    reject: vi.fn(),
  },
}));

describe("ReviewerDashboard", () => {
  beforeEach(() => {
    reviewerService.listAssigned.mockResolvedValue([
      { id: "1", title: "Leave Request", description: "PTO for next week", status: "PENDING" },
    ]);
    reviewerService.approve.mockResolvedValue({});
    reviewerService.reject.mockResolvedValue({});
  });

  it("lists pending requests assigned to the reviewer", async () => {
    render(<ReviewerDashboard />);
    expect(await screen.findByText("Leave Request")).toBeInTheDocument();
  });

  it("lets a reviewer approve a selected request", async () => {
    render(<ReviewerDashboard />);

    const requestButton = await screen.findByText("Leave Request");
    fireEvent.click(requestButton);

    fireEvent.click(screen.getByRole("button", { name: /approve/i }));

    await waitFor(() => expect(reviewerService.approve).toHaveBeenCalledWith("1", ""));
  });

  it("lets a reviewer reject a selected request with comments", async () => {
    render(<ReviewerDashboard />);

    const requestButton = await screen.findByText("Leave Request");
    fireEvent.click(requestButton);

    fireEvent.change(screen.getByLabelText(/comments/i), { target: { value: "Missing details" } });
    fireEvent.click(screen.getByRole("button", { name: /reject/i }));

    await waitFor(() => expect(reviewerService.reject).toHaveBeenCalledWith("1", "Missing details"));
  });
});
