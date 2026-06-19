import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function RequestCard({ request }) {
  const priorityClass = request.priority?.toLowerCase();

  return (
    <Link to={`/requests/${request.id}`} className={`request-card request-card--${priorityClass}`}>
      <div className="request-card__header">
        <span className="request-card__title">{request.title}</span>
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
