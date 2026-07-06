function ConfirmModal({
    show,
    title,
    message,
    onConfirm,
    onCancel
}) {
    if (!show) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
        >
            <div
                className="card p-4 shadow"
                style={{
                    width: "400px"
                }}
            >
                <h4>{title}</h4>

                <p>{message}</p>

                <div className="d-flex justify-content-end gap-2">
                    <button
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;