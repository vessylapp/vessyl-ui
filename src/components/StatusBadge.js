const toneClasses = {
    neutral: "",
    success: "status-badge-success",
    warning: "status-badge-warning",
    danger: "status-badge-danger",
};

export default function StatusBadge({ tone = "neutral", children }) {
    return <span className={`status-badge ${toneClasses[tone] || ""}`.trim()}>{children}</span>;
}
