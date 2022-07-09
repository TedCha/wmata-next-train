import styled from "styled-components";
import { StationData } from "../types";
import { Dispatch, SetStateAction } from "react";

const Container = styled.div`
    padding-bottom: 2rem;
    padding-right: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: right;
`;

const Select = styled.select`
    min-width: 20rem;
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
            <Select value={props.stationCode} onChange={(event) => {props.setStationCode(event.target.value);}}>
                {props?.stations?.map((station, i) => {
                    return (
                        <option key={i} value={station.Code}>{station.Name}</option>
                    );
                })}
            </Select>
        </Container>
    );
};