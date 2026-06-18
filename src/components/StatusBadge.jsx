const STATUS_STYLES = {
  PENDING: { backgroundColor: "#fef3c7", color: "#92400e" },
  APPROVED: { backgroundColor: "#dcfce7", color: "#166534" },
  REJECTED: { backgroundColor: "#fee2e2", color: "#991b1b" },
};

export default function StatusBadge({ status }) {
  return (
    <span className="badge" style={STATUS_STYLES[status] || {}}>
      {status}
    </span>
  );
}
