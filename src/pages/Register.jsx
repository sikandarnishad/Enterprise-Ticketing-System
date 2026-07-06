import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "Customer"
    });

    const registerUser = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            const endpoint =
                form.role === "Engineer"
                    ? "/Auth/register-engineer"
                    : "/Auth/register";

            await api.post(
                endpoint,
                {
                    username: form.username,
                    email: form.email,
                    password: form.password
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                `${form.role} Registered Successfully`
            );

            navigate("/admin");

        } catch (error) {

            console.log(error);
            alert("Registration Failed");
        }
    };

    return (
        //<div className="container mt-5">
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


            <div className="card shadow p-4">

                <h2 className="mb-4">
                    Create User
                </h2>

                <form onSubmit={registerUser}>

                    <div className="mb-3">
                        <input
                            className="form-control"
                            placeholder="Username"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    username:
                                        e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            className="form-control"
                            placeholder="Email"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email:
                                        e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password:
                                        e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="mb-3">

                        <select
                            className="form-select"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    role:
                                        e.target.value
                                })
                            }
                        >
                            <option>
                                Customer
                            </option>

                            <option>
                                Engineer
                            </option>

                        </select>

                    </div>

                    <button
                        className="btn btn-primary"
                    >
                        Create User
                    </button>

                </form>

            </div>

            </div>
        </div>
    );
}

export default Register;