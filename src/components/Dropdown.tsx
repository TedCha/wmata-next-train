import styled from "styled-components";
import { StationData } from "../types";
import { Dispatch, SetStateAction } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

interface DropdownProps {
    stations?: StationData[]
    stationCode?: string
    setStationCode: Dispatch<SetStateAction<string | undefined>>;
};

// TODO: Style
export const Dropdown = (props: DropdownProps) => {
    return (
        <Container>
            <select value={props.stationCode} onChange={(event) => {props.setStationCode(event.target.value);}}>
                {props?.stations?.map((station, i) => {
                    return (
                        <option key={i} value={station.Code}>{station.Name}</option>
                    );
                })}
            </select>
        </Container>
    );
};