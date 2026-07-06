import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function Engineers() {

    const [engineers, setEngineers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadEngineers();
    }, []);

    const loadEngineers = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    "/Roles/engineers",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setEngineers(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const deleteEngineer =
        async (username) => {

            try {

                const token =
                    localStorage.getItem("token");

                await api.delete(
                    `/Roles/engineer/${username}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                alert(
                    "Engineer Deleted"
                );

                loadEngineers();

            } catch (error) {

                console.log(error);

                alert(
                    "Delete Failed"
                );
            }
        };

    return (
        //<div className="container mt-4">
        //    <Sidebar />

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



            <h2>
                Engineers Management
            </h2>

            <div className="row my-3">

                <div className="col-md-4">

                    <input
                        className="form-control"
                        placeholder="Search Engineer"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>

            <table className="table table-bordered table-hover shadow">

                <thead className="table-dark">

                    <tr>

                        <th>
                            Username
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {engineers
                        .filter(x =>
                            x
                                .toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )
                        )
                        .map(engineer => (

                            <tr
                                key={engineer}
                            >

                                <td>
                                    {engineer}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteEngineer(
                                                engineer
                                            )
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

export default Engineers;