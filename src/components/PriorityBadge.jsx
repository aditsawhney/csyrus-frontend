const PRIORITY_STYLES = {
  LOW:    { backgroundColor: "var(--color-low-bg)",    color: "var(--color-low)" },
  MEDIUM: { backgroundColor: "var(--color-medium-bg)", color: "var(--color-medium)" },
  HIGH:   { backgroundColor: "var(--color-high-bg)",   color: "var(--color-high)" },
};

export default function PriorityBadge({ priority }) {
  return (
    <span className="badge" style={PRIORITY_STYLES[priority] || {}}>
      {priority}
    </span>
  );
}
