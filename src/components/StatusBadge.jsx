function StatusBadge({ status }) {
    let badgeClass = "bg-secondary";

    if (status === "Open")
        badgeClass = "bg-warning text-dark";

    if (status === "In Progress")
        badgeClass = "bg-info";

    if (status === "Resolved")
        badgeClass = "bg-success";

    if (status === "Closed")
        badgeClass = "bg-dark";

    return (
        <span className={`badge ${badgeClass}`}>
            {status}
        </span>
    );
}

export default StatusBadge;