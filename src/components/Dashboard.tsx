import { useEffect, useState } from "react";
import wmataService from "../api/wmata";

interface DashboardProps {
    stationCode: string
}

export const Dashboard = (props: DashboardProps) => {
    const [station, setStation] = useState<string>('');

    useEffect(() => {
        wmataService.getRailPredictionsForStation(props.stationCode)
            .then(initialStation => setStation(initialStation))
            .catch(() => setStation(''));
    }, [props.stationCode]);

    return (
        <div>
            <p></p>
        </div>
    );
};