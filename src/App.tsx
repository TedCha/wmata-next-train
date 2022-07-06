import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { wmataClient } from './api/wmata';
import { getPosition, getDistanceInMeters } from './util';
import { Dashboard } from './components/Dashboard';

const Wrapper = styled.div`
    background-color: red;
    max-width: 120rem;
    margin: 8rem auto;
    min-height: 50rem;
`;

const App = () => {
    const executedStationFetchRef = useRef(false);
    const executedUserCoordinatesFetchRef = useRef(false);
    const [stations, setStations] = useState([]);
    const [userCoordinates, setUserCoordinates] = useState<GeolocationCoordinates | null>(null);
    const [currentStation, setCurrentStation] = useState('');

    useEffect(() => {
        if (executedStationFetchRef.current) return;
        wmataClient.getRailStationList()
            .then(initialStations => setStations(initialStations))
            .catch(() => setStations([]));
        executedStationFetchRef.current = true;
    }, []);

    useEffect(() => {
        if (executedUserCoordinatesFetchRef.current) return;
        getPosition()
            .then(initialPosition => setUserCoordinates(initialPosition.coords))
            .catch(); // TODO; catch exceptions
            executedUserCoordinatesFetchRef.current = true;
    }, []);

    /* 
    TODO:
    * Create function that determines if a metro station is in range of user location
    * Implement Dashboard component; use prediction call within component
    * Create dropdown for selecting metro station (if no location or user override)
    */

    return (
        <Wrapper>

        </Wrapper>
    );
};

export default App;
