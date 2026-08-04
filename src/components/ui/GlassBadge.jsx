const badgeStyles = {
    verified: "badge badge-verified",
    pending: "badge badge-pending",
    rejected: "badge badge-rejected",
    expired: "badge badge-expired",
    draft: "badge badge-blue",
    downloaded: "badge badge-downloaded",
    active: "badge badge-active",
    gold: "badge badge-gold",
    blue: "badge badge-blue",
    neutral: "badge badge-neutral",
    default: "badge badge-neutral",
};

export default function GlassBadge({ label, variant = "default", className = "", icon }) {
    return (
        <span className={`${badgeStyles[variant] || badgeStyles.default} ${className}`}>
            {icon ? <span className="inline-flex items-center">{icon}</span> : null}
            {label}
        </span>
    );
}
