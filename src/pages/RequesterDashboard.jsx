import { Link } from "react-router-dom";
import RequestCard from "../components/RequestCard";
import { useAuth } from "../hooks/useAuth";
import { useRequests } from "../hooks/useRequests";

export default function RequesterDashboard() {
  const { user } = useAuth();
  const { requests, loading, error } = useRequests();

  const pending = requests.filter((r) => r.status === "PENDING").length;
  const approved = requests.filter((r) => r.status === "APPROVED").length;
  const rejected = requests.filter((r) => r.status === "REJECTED").length;

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1>Welcome, {user?.name}</h1>
          <p>Track and manage your approval requests.</p>
        </div>
        <Link to="/requests/new" className="primary-button">
          + New Request
        </Link>
      </div>

      <div className="dashboard__stats">
        <div className="stat-card">
          <div className="stat-card__label">Total</div>
          <div className="stat-card__value">{requests.length}</div>
        </div>
        <div className="stat-card stat-card--pending">
          <div className="stat-card__label">Pending</div>
          <div className="stat-card__value">{pending}</div>
        </div>
        <div className="stat-card stat-card--approved">
          <div className="stat-card__label">Approved</div>
          <div className="stat-card__value">{approved}</div>
        </div>
        <div className="stat-card stat-card--rejected">
          <div className="stat-card__label">Rejected</div>
          <div className="stat-card__value">{rejected}</div>
        </div>
      </div>

      <div className="section-heading">Recent Requests</div>

      {loading && <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>Loading...</p>}
      {error && <p role="alert">{error}</p>}

      <div className="dashboard__list" aria-label="request-list">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
        {!loading && requests.length === 0 && (
          <div className="empty-state">
            <p>No requests yet.</p>
            <Link to="/requests/new" className="primary-button">Create your first request</Link>
          </div>
        )}
      </div>
    </div>
  );
}
