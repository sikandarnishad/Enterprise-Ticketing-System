import {
    Pie
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function DashboardCharts() {

    const data = {
        labels: [
            "Open",
            "Resolved",
            "Closed"
        ],
        datasets: [
            {
                data: [5, 3, 2],
                backgroundColor: [
                    "#ffc107",
                    "#198754",
                    "#0d6efd"
                ]
            }
        ]
    };

    return (

        <div className="card shadow mt-4 p-4">

            <h4 className="mb-3">
                Ticket Status
            </h4>

            <div
                style={{
                    width: "350px",
                    margin: "auto"
                }}
            >
                <Pie data={data} />
            </div>

        </div>

    );
}

export default DashboardCharts;