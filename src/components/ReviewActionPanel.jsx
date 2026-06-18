import { useState } from "react";

export default function ReviewActionPanel({ onApprove, onReject }) {
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handle = async (action) => {
    setSubmitting(true);
    setError(null);
    try {
      await action(comments);
    } catch (err) {
      setError(err.response?.data?.detail || "Action failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-panel">
      <div className="form-group">
        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Add a note explaining your decision..."
        />
      </div>
      {error && <p role="alert">{error}</p>}
      <div className="review-panel__actions">
        <button className="approve-button" disabled={submitting} onClick={() => handle(onApprove)}>
          Approve
        </button>
        <button className="reject-button" disabled={submitting} onClick={() => handle(onReject)}>
          Reject
        </button>
      </div>
    </div>
  );
}
