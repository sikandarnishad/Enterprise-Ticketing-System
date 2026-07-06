import { useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function CreateTicket() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [category, setCategory] = useState("Software");
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            let attachmentPath = "";

            // Upload file first
            if (file) {

                const formData = new FormData();

                formData.append("file", file);

                const uploadResponse = await api.post(
                    "/Tickets/upload",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                attachmentPath = uploadResponse.data;
            }

            // Create ticket
            const response = await api.post(
                "/Tickets",
                {
                    title,
                    description,
                    status: "Open",
                    priority,
                    category,
                    attachmentPath
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            alert("Ticket Created Successfully");

            setTitle("");
            setDescription("");
            setPriority("Medium");
            setCategory("Software");
            setFile(null);

        }
        catch (error) {

            console.log(error);

            alert("Failed To Create Ticket");
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


            <h2>Create Ticket</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Title</label>

                    <input
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Description</label>

                    <textarea
                        className="form-control"
                        rows="5"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">

                    <label>Priority</label>

                    <select
                        className="form-select"
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                    </select>

                </div>

                <div className="mb-3">

                    <label>Category</label>

                    <select
                        className="form-select"
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    >
                        <option>Software</option>
                        <option>Hardware</option>
                        <option>Network</option>
                        <option>Printer</option>
                    </select>

                </div>

                <div className="mb-3">

                    <label>Attachment (Optional)</label>

                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) =>
                            setFile(e.target.files[0])
                        }
                    />

                </div>

                <button
                    className="btn btn-primary"
                    type="submit"
                >
                    Create Ticket
                </button>

            </form>

            </div>
        </div>
    );
}

export default CreateTicket;