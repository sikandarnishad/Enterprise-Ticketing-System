import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/Auth/login", {
                username,
                password
            });

            const token = response.data.token;

            // Save Token
            localStorage.setItem("token", token);

            // Decode JWT
            const decoded = jwtDecode(token);

            console.log("TOKEN =", token);
            console.log("DECODED =", decoded);

            // Save Username
            const loggedInUser =
                decoded["unique_name"] || username;

            localStorage.setItem(
                "username",
                loggedInUser
            );

            // Save Role
            const roles =
                decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            const role = Array.isArray(roles)
                ? roles[0]
                : roles;

            localStorage.setItem(
                "role",
                role
            );

            alert("Login Successful");

            // Redirect By Role
            switch (role) {

                case "Admin":
                    navigate("/admin");
                    break;

                case "Engineer":
                    navigate("/engineer");
                    break;

                default:
                    navigate("/customer");
                    break;
            }

        }
        catch (error) {

            console.log(error);

            alert("Invalid Username or Password");
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Ticketing System Login
                        </h2>

                        <form onSubmit={handleLogin}>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;