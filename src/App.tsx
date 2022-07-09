import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { wmataClient } from './api/wmata';
import { getPosition, getDistanceInMeters } from './util';
import { Dashboard } from './components/Dashboard';
import { StationData } from './types';
import { Dropdown } from './components/Dropdown';

const Wrapper = styled.div`
    max-width: 120rem;
    margin: 4rem auto;
    min-height: 100%;
`;

const App = () => {
    const executedStationFetchRef = useRef(false);
    const executedUserCoordinatesFetchRef = useRef(false);
    const [stations, setStations] = useState<StationData[]>();
    const [currentStationCode, setCurrentStationCode] = useState<string>();

    useEffect(() => {
        if (executedStationFetchRef.current) return;
        wmataClient.getRailStationList()
            .then(initialStations => setStations(initialStations.Stations))
            .catch(); // TODO: Handle exceptions
        executedStationFetchRef.current = true;
    }, []);

    useEffect(() => {
        if (executedUserCoordinatesFetchRef.current) return;
        getPosition()
            .then(() => {
                // TODO: Create function that determines if a metro station is in range of user location
                setCurrentStationCode('C08');
            })
            .catch(); // TODO: Handle exceptions
        executedUserCoordinatesFetchRef.current = true;
    }, []);

    return (
        <Wrapper>
            <Dropdown 
                stations={stations} 
                stationCode={currentStationCode} 
                setStationCode={setCurrentStationCode} 
            />
            <Dashboard stationCode={currentStationCode} />
        </Wrapper>
    );
};

export default App;
