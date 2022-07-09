import { useEffect, useState } from "react";
import styled from "styled-components";
import { wmataClient } from "../api/wmata";
import { PredictionData } from "../types";

const Container = styled.div`
    flex-direction: column;
    justify-content: space-between;
    /* Linear Font Size Equation: 
    https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/ */
    font-size: clamp(2.6rem, 1.8953rem + 1.8792vw, 4rem);
    text-transform: uppercase;
    background-color: blue;
    margin: auto 4rem;
    overflow-y: scroll;
    max-height: 50rem;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    
    th, td {
        text-align: center;
        vertical-align: middle;
    }

    @media screen and (max-width: 600px) {
        /* Force table to not be like tables anymore */
	    table, thead, tbody, 
	    th, td, tr { 
		    display: block;
	    }

        thead tr { 
            display: none;
        }

        /* Zebra striping */
        tr:nth-of-type(odd) { 
        background: #eee; 
        }

        td { 
            /* Behave like a "row" */
            border: none;
            position: relative;
            padding-left: 50%;
            white-space: normal;
            text-align:left;
        }

        td:before { 
            /* Now like a table header */
            position: absolute;
            /* Top/left values mimic padding */
            top: 6px;
            left: 6px;
            width: 45%; 
            padding-right: 10px; 
            white-space: nowrap;
            text-align:left;
            font-weight: bold;
            content: attr(data-title); 
        }
    };
`;

interface DashboardProps {
    stationCode?: string
}

// TODO: Style
export const Dashboard = (props: DashboardProps) => {
    const [predictions, setPredictions] = useState<(PredictionData[])>();

    useEffect(() => {
        if (props?.stationCode) {
            wmataClient.getRailPredictionsForStation(props?.stationCode)
            .then(initialPredictions => setPredictions(initialPredictions.Trains))
            .catch(); // TODO: Handle exception
        }
    }, [props?.stationCode]);

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>LN</th>
                        <th>CAR</th>
                        <th>DEST</th>
                        <th>MIN</th>
                    </tr>
                </thead>
                <tbody>
                    {predictions?.map((pred, i) => {
                        return (
                            <tr key={i}>
                                <td data-title="LN">{pred?.Line}</td>
                                <td data-title="CAR">{pred?.Car}</td>
                                <td data-title="DEST">{pred?.Destination}</td>
                                <td data-title="MIN">{pred?.Min}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
};