import { useEffect, useState } from "react";
import ReviewActionPanel from "../components/ReviewActionPanel";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../hooks/useAuth";
import { reviewerService } from "../services/reviewerService";

export default function ReviewerDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = () => reviewerService.listAssigned().then(setRequests);

  useEffect(() => { load(); }, []);

  const handleApprove = async (comments) => {
    await reviewerService.approve(selected.id, comments);
    setSelected(null);
    load();
  };

  const handleReject = async (comments) => {
    await reviewerService.reject(selected.id, comments);
    setSelected(null);
    load();
  };

  const pending = requests.filter((r) => r.status === "PENDING");

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1>Welcome, {user?.name}</h1>
          <p>Review and action pending requests assigned to you.</p>
        </div>
      </div>

      <div className="reviewer-layout">
        <div>
          <div className="section-heading">Pending Requests ({pending.length})</div>
          <div className="reviewer-list" aria-label="pending-requests">
            {pending.map((request) => (
              <button
                key={request.id}
                className={`request-row ${selected?.id === request.id ? "active" : ""}`}
                onClick={() => setSelected(request)}
              >
                <span className="request-row__title">{request.title}</span>
                <StatusBadge status={request.status} />
              </button>
            ))}
            {pending.length === 0 && (
              <div className="empty-state">
                <p>No pending requests assigned to you.</p>
              </div>
            )}
          </div>
        </div>

        {selected && (
          <div className="review-detail" aria-label="request-detail">
            <h2>{selected.title}</h2>
            <p className="review-detail__description">{selected.description}</p>
            <ReviewActionPanel onApprove={handleApprove} onReject={handleReject} />
          </div>
        )}
      </div>
    </div>
  );
}
