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

  useEffect(() => {
    load();
  }, []);

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
      <h1>Welcome, {user?.name}</h1>
      <div className="reviewer-layout">
        <section aria-label="pending-requests">
          {pending.map((request) => (
            <button key={request.id} className="request-row" onClick={() => setSelected(request)}>
              <span>{request.title}</span>
              <StatusBadge status={request.status} />
            </button>
          ))}
          {pending.length === 0 && <p>No pending requests assigned to you.</p>}
        </section>

        {selected && (
          <section aria-label="request-detail">
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <ReviewActionPanel onApprove={handleApprove} onReject={handleReject} />
          </section>
        )}
      </div>
    </div>
  );
}
