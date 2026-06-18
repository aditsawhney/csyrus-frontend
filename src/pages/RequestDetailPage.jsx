import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  if (error) return <p role="alert">{error}</p>;
  if (!request) return <p>Loading...</p>;

  return (
    <div className="page">
      <header>
        <h1>{request.title}</h1>
        <StatusBadge status={request.status} />
      </header>
      <p>{request.description}</p>
      <p>Priority: {request.priority}</p>
      <p>Submitted: {formatDate(request.created_at)}</p>

      {request.status === "PENDING" && <button onClick={handleDelete}>Delete Request</button>}
    </div>
  );
}
