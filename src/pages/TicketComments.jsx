import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function TicketComments() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadComments();
    }, []);

    const loadComments = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                `/TicketComments/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setComments(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const addComment = async () => {

        if (!message.trim()) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const username =
                localStorage.getItem("username");

            await api.post(
                "/TicketComments",
                {
                    ticketId: parseInt(id),
                    userName: username,
                    message: message
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("");

            loadComments();

        } catch (error) {

            console.log(error);
            alert("Failed to add comment");
        }
    };

    return (
        //<div className="container mt-4">
        //<Sidebar/>

        <div className="d-flex">

            <Sidebar />

            <div
                className="container-fluid"
                style={{
                    marginLeft: "240px",
                    minHeight: "100vh",
                    padding: "30px",
                    background:
                        "linear-gradient(135deg,#f8fafc,#e0f2fe,#dbeafe)"
                }}
            >


            <div className="d-flex justify-content-between">

                <h2>Ticket Discussion</h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>

            </div>

            <div className="card shadow p-3 mt-3">

                <div className="mb-3">

                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Write comment..."
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                    />

                </div>

                <button
                    className="btn btn-primary"
                    onClick={addComment}
                >
                    Add Comment
                </button>

            </div>

            <div className="mt-4">

                {comments.length === 0 && (
                    <p>No comments yet.</p>
                )}

                {comments.map(comment => (

                    <div
                        key={comment.id}
                        className="card shadow-sm p-3 mb-3"
                    >

                        <div className="d-flex justify-content-between">

                            <strong>
                                {comment.userName}
                            </strong>

                            <small>
                                {new Date(
                                    comment.createdDate
                                ).toLocaleString()}
                            </small>

                        </div>

                        <hr />

                        <p className="mb-0">
                            {comment.message}
                        </p>

                    </div>

                ))}

            </div>
            </div>
        </div>
    );
}

export default TicketComments;