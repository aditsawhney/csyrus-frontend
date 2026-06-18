const STATUS_STYLES = {
  PENDING:  { backgroundColor: "var(--color-pending-bg)",  color: "var(--color-pending)" },
  APPROVED: { backgroundColor: "var(--color-approved-bg)", color: "var(--color-approved)" },
  REJECTED: { backgroundColor: "var(--color-rejected-bg)", color: "var(--color-rejected)" },
};

export default function StatusBadge({ status }) {
  return (
    <span className="badge" style={STATUS_STYLES[status] || {}}>
      {status}
    </span>
  );
}
