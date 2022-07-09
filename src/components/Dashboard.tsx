import { useEffect, useState } from "react";
import styled from "styled-components";
import { wmataClient } from "../api/wmata";
import { PredictionData } from "../types";

const Container = styled.div`
    flex-direction: column;
    justify-content: space-between;
    font-size: 5rem;
    background-color: blue;
    margin: auto 6rem;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Data = styled.td`
    text-align: center; 
    vertical-align: middle;
`;

interface DashboardProps {
    stationCode: string
}

export const Dashboard = (props: DashboardProps) => {
    const [predictions, setPredictions] = useState<(PredictionData[])>();

    useEffect(() => {
        wmataClient.getRailPredictionsForStation(props.stationCode)
            .then(initialPredictions => setPredictions(initialPredictions.Trains))
            .catch(); // TODO: Handle exception
    }, [props.stationCode]);

    console.log(predictions?.[0]?.DestinationCode);

    return (
        <Container>
            <Table>
                <tr>
                    <th>LN</th>
                    <th>CAR</th>
                    <th>DEST</th>
                    <th>MIN</th>
                </tr>
                {predictions?.map(pred => {
                    return (
                        <tr>
                            <Data>{pred?.Line}</Data>
                            <Data>{pred?.Car}</Data>
                            <Data>{pred?.DestinationName}</Data>
                            <Data>{pred?.Min}</Data>
                        </tr>
                    );
                })}
            </Table>
        </Container>
    );
};