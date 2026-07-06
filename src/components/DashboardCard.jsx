function DashboardCard({
    title,
    description,
    icon,
    value,
    onClick
}) {
    return (
        <div className="col-md-3 mb-4">
           <div
    className="card border-0 h-100"
    style={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        borderRadius: "15px",

        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",

        boxShadow:
            "0 8px 20px rgba(0,0,0,0.12)"
    }}

                onClick={onClick}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                        "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                        "translateY(0)";
                    e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(0,0,0,0.1)";
                }}
            >
                <div className="card-body">

                    <h4
                        className="mb-3"
                        style={{
                            fontWeight: "600"
                        }}
                    >
                        {icon} {title}
                    </h4>

                    {description && (
                        <p
                            className="text-muted"
                            style={{
                                minHeight: "45px"
                            }}
                        >
                            {description}
                        </p>
                    )}

                    {value !== undefined && (
                        <h2
                            className="mt-3"
                            style={{
                                color: "#2563eb",
                                fontWeight: "700"
                            }}
                        >
                            {value}
                        </h2>
                    )}

                </div>
            </div>
        </div>
    );
}

export default DashboardCard;