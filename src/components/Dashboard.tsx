import { useEffect, useState } from "react";
import styled from "styled-components";
import { wmataClient } from "../api/wmata";
import { PredictionData } from "../types";

const Container = styled.div`
    /* 
    Linear Font Size Equation: 
    https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/ 
    */
    font-size: clamp(3.2rem, 2.0182rem + 3.1515vw, 5.8rem);
    font-family: 'VT323', monospace;
    text-transform: uppercase;
    margin: auto 4rem;
    overflow-y: scroll;
    max-height: 75vh;

`;

const Table = styled.table`
    /* Variables */
    --font-color-table-header: #ff3c31;
    --font-color-table-data: #f7d53e;
    --background-color-table-nth: #1c1c1c;

    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;

    th, td {
        text-align: center;
        vertical-align: middle;
    }

    th {
        color: var(--font-color-table-header);
    }

    td {
        color: var(--font-color-table-data);
    }

    @media screen and (max-width: 600px) {
        /* force table to not act like a table */
	    table, thead, tbody, 
	    th, td, tr { 
		    display: block;
	    }

        /* make table header row disappear */
        thead tr { 
            display: none;
        }

        /* table zebra striping */
        tr:nth-of-type(odd) { 
            background: var(--background-color-table-nth); 
        }

        tr {
            padding: 0.8rem 0;
        }

        /* Make table data behave like a "row" */
        td { 
            border: none;
            position: relative;
            padding-left: 50%;
            white-space: normal;
            text-align:left;
        }

        td:before {
            color: var(--font-color-table-header);
            position: absolute;
            left: 0%;
            white-space: nowrap;
            vertical-align: middle;
            font-weight: bold;
            content: attr(data-title); 
        }
    };
`;

interface DashboardProps {
    stationCode?: string
}

export const Dashboard = (props: DashboardProps) => {
    const [predictions, setPredictions] = useState<(PredictionData[])>();

    useEffect(() => {
        if (props?.stationCode) {
            wmataClient.getRailPredictionsForStation(props?.stationCode)
            .then(initialPredictions => setPredictions(initialPredictions.Trains))
            .catch(); // TODO: Handle exceptions
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