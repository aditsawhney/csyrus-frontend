import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import RequesterDashboard from "../src/pages/RequesterDashboard";
import { useRequests } from "../src/hooks/useRequests";

vi.mock("../src/hooks/useAuth", () => ({
  useAuth: () => ({ user: { name: "Adit", role: "REQUESTER" } }),
}));

vi.mock("../src/hooks/useRequests", () => ({
  useRequests: vi.fn(),
}));

describe("RequesterDashboard", () => {
  it("renders requests returned by the hook", () => {
    useRequests.mockReturnValue({
      requests: [
        {
          id: "1",
          title: "Expense sign-off",
          description: "Client dinner reimbursement",
          status: "PENDING",
          priority: "LOW",
          created_at: new Date().toISOString(),
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <RequesterDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText("Expense sign-off")).toBeInTheDocument();
    expect(screen.getByText("PENDING")).toBeInTheDocument();
  });

  it("shows an empty state when there are no requests", () => {
    useRequests.mockReturnValue({ requests: [], loading: false, error: null });

    render(
      <MemoryRouter>
        <RequesterDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/no requests yet/i)).toBeInTheDocument();
  });
});
