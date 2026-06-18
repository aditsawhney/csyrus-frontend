const PRIORITY_STYLES = {
  LOW: { backgroundColor: "#e0f2fe", color: "#075985" },
  MEDIUM: { backgroundColor: "#ede9fe", color: "#5b21b6" },
  HIGH: { backgroundColor: "#ffe4e6", color: "#9f1239" },
};

export default function PriorityBadge({ priority }) {
  return (
    <span className="badge" style={PRIORITY_STYLES[priority] || {}}>
      {priority}
    </span>
  );
}
