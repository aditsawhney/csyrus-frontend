import { useState } from "react";

export default function RequestForm({ initialValues, reviewers, onSubmit, submitLabel = "Submit" }) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [priority, setPriority] = useState(initialValues?.priority || "MEDIUM");
  const [reviewerId, setReviewerId] = useState(initialValues?.reviewer_id || "");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await onSubmit({ title, description, priority, reviewer_id: reviewerId });
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="request-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Brief description of the request" required />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide full details about this request..." required />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="reviewer">Assign Reviewer</label>
        <select id="reviewer" value={reviewerId} onChange={(e) => setReviewerId(e.target.value)} required>
          <option value="">Select a reviewer</option>
          {reviewers.map((reviewer) => (
            <option key={reviewer.id} value={reviewer.id}>
              {reviewer.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="primary-button">{submitLabel}</button>
      </div>
    </form>
  );
}
