import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function Users() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [file, setFile] = useState(null);

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        role: "Customer"
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/Roles/all-users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const createUser = async () => {

        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/Auth/create-user",
                {
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                    role: newUser.role
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("User Created Successfully");

            setNewUser({
                username: "",
                email: "",
                password: "",
                role: "Customer"
            });

            loadUsers();

        } catch (error) {

            console.log(error);
            alert("Failed To Create User");
        }
    };

    const deleteUser = async (username) => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(
                `/Roles/delete-user/${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("User Deleted");

            loadUsers();

        } catch (error) {

            console.log(error);
            alert("Delete Failed");
        }
    };

    const importUsers = async () => {

        try {

            if (!file) {
                alert("Please Select Excel File");
                return;
            }

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("file", file);

            await api.post(
                "/Auth/import-users",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Users Imported Successfully");

            setFile(null);

            loadUsers();

        } catch (error) {

            console.log(error);
            alert("Import Failed");
        }
    };

    const exportUsers = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    "/Roles/export-users",
                    {
                        responseType: "blob",
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );

            const link =
                document.createElement("a");

            link.href = url;
            link.download = "Users.xlsx";

            link.click();

        } catch (error) {

            console.log(error);
            alert("Export Failed");
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


            <h2>User Management</h2>

            {/* Import Excel */}

            <div className="card p-4 shadow mb-4">

                <h4>Import Users From Excel</h4>

                <div className="row">

                    <div className="col-md-6">

                        <input
                            type="file"
                            className="form-control"
                            accept=".xlsx,.xls"
                            onChange={(e) =>
                                setFile(e.target.files[0])
                            }
                        />

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn btn-primary w-100"
                            onClick={importUsers}
                        >
                            Import Excel
                        </button>

                    </div>

                    <button
                        className="btn btn-success mb-3"
                        onClick={exportUsers}
                    >
                        Export Excel
                    </button>



                </div>

            </div>

            {/* Create User */}

            <div className="card p-4 shadow mb-4">

                <h4>Create User</h4>

                <div className="row g-2">

                    <div className="col-md-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={newUser.username}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    username: e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-3">

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    email: e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-2">

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    password: e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-2">

                        <select
                            className="form-select"
                            value={newUser.role}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    role: e.target.value
                                })
                            }
                        >
                            <option>Customer</option>
                            <option>Engineer</option>
                            <option>Admin</option>
                        </select>

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn btn-success w-100"
                            onClick={createUser}
                        >
                            Create User
                        </button>

                    </div>



                </div>

            </div>

            {/* Search */}

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search User..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            {/* User Table */}

            <button
                className="btn btn-success mb-3"
                onClick={exportUsers}
            >
                Export Users Excel
            </button>

            <table className="table table-bordered table-hover shadow">

                <thead className="table-dark">

                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {users
                        .filter(user =>
                            user.username
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((user, index) => (

                            <tr key={index}>

                                <td>{user.username}</td>

                                <td>
                                    <span className="badge bg-primary">
                                        {user.role}
                                    </span>
                                </td>

                                <td>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteUser(user.username)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                </tbody>

                </table>
            </div>

        </div>
    );
}

export default Users;