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
      <header className="dashboard__header">
        <div>
          <h1>Welcome, {user?.name}</h1>
          <p>Track and manage your approval requests.</p>
        </div>
        <Link to="/requests/new" className="primary-button">
          New Request
        </Link>
      </header>

      <section className="dashboard__stats">
        <div className="stat-card">
          <strong>{requests.length}</strong>
          <span>Total</span>
        </div>
        <div className="stat-card">
          <strong>{pending}</strong>
          <span>Pending</span>
        </div>
        <div className="stat-card">
          <strong>{approved}</strong>
          <span>Approved</span>
        </div>
        <div className="stat-card">
          <strong>{rejected}</strong>
          <span>Rejected</span>
        </div>
      </section>

      {loading && <p>Loading requests...</p>}
      {error && <p role="alert">{error}</p>}

      <section className="dashboard__list" aria-label="request-list">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
        {!loading && requests.length === 0 && <p>No requests yet. Create your first one.</p>}
      </section>
    </div>
  );
}
