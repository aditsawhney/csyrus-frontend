import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RequestForm from "../src/components/RequestForm";

const reviewers = [{ id: "r1", name: "Reviewer One" }];

describe("RequestForm", () => {
  it("submits the entered values to onSubmit", async () => {
    const onSubmit = vi.fn().mockResolvedValue();
    render(<RequestForm reviewers={reviewers} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Expense" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Client dinner" } });
    fireEvent.change(screen.getByLabelText(/reviewer/i), { target: { value: "r1" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        title: "Expense",
        description: "Client dinner",
        priority: "MEDIUM",
        reviewer_id: "r1",
      })
    );
  });

  it("shows an error message when submission fails", async () => {
    const onSubmit = vi.fn().mockRejectedValue({ response: { data: { detail: "Reviewer not found" } } });
    render(<RequestForm reviewers={reviewers} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Expense" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Client dinner" } });
    fireEvent.change(screen.getByLabelText(/reviewer/i), { target: { value: "r1" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/reviewer not found/i)).toBeInTheDocument();
  });
});
