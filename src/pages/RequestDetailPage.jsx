import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PriorityBadge from "../components/PriorityBadge";
import StatusBadge from "../components/StatusBadge";
import { requestService } from "../services/requestService";
import { formatDate } from "../utils/formatDate";

export default function RequestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestService
      .get(id)
      .then(setRequest)
      .catch((err) => setError(err.response?.data?.detail || "Failed to load request"));
  }, [id]);

  const handleDelete = async () => {
    await requestService.remove(id);
    navigate("/");
  };

  if (error) return <div className="page"><p role="alert">{error}</p></div>;
  if (!request) return <div className="page"><p style={{ color: "var(--color-text-muted)" }}>Loading...</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>{request.title}</h1>
        <div className="page-header__meta">
          <StatusBadge status={request.status} />
          <PriorityBadge priority={request.priority} />
        </div>
      </div>

      <p className="detail-body">{request.description}</p>

      <div className="detail-meta">
        <span><strong>Submitted:</strong> {formatDate(request.created_at)}</span>
      </div>

      {request.status === "PENDING" && (
        <button className="danger-button" onClick={handleDelete}>
          Delete Request
        </button>
      )}
    </div>
  );
}
