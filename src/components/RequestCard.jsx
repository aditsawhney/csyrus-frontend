import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function RequestCard({ request }) {
  return (
    <Link to={`/requests/${request.id}`} className="request-card">
      <div className="request-card__header">
        <h3>{request.title}</h3>
        <StatusBadge status={request.status} />
      </div>
      <p className="request-card__description">{request.description}</p>
      <div className="request-card__footer">
        <PriorityBadge priority={request.priority} />
        <span>{formatDate(request.created_at)}</span>
      </div>
    </Link>
  );
}
