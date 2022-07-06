import axios, { AxiosRequestConfig } from "axios";
import { mock } from '../util';
import mockStationData from '../data/mockStationData.wmata.json';
import mockPredictionData from '../data/mockStationData.wmata.json';

const DEBUG = process.env.REACT_APP_IS_DEV === 'true';
const BASE_URL = 'https://api.wmata.com';
const WMATA_API_CONFIG: AxiosRequestConfig = {
    headers: { 'api_key': process.env.REACT_APP_WMATA_API_KEY as string }
};

class WmataClient {

    private reqWithConfig = async (mthd: string, url: string) => {
        const response = await axios({ method: mthd, url: url, ...WMATA_API_CONFIG });
        return response.data;
    };

    @mock(DEBUG, 500, mockStationData)
    public getRailStationList() {
        const apiUrl = `${BASE_URL}/Rail.svc/json/jStations`;
        return this.reqWithConfig('GET', apiUrl);
    };

    @mock(DEBUG, 500, mockPredictionData)
    public getRailPredictionsForStation(stationCode: string) {
        const apiUrl = `${BASE_URL}/StationPrediction.svc/json/GetPrediction/${stationCode}`;
        return this.reqWithConfig('GET', apiUrl);
    };

}

export const wmataClient = new WmataClient();