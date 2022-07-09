import axios, { AxiosRequestConfig } from "axios";
import { mockd } from '../util';
import mockStationData from '../data/mockStationData.wmata.json';
import mockPredictionData from '../data/mockPredictionData.wmata.json';

const DEBUG = process.env.REACT_APP_IS_DEV === 'true';

class WmataClient {
    private baseUrl: string;
    private apiKey: string;
    private requestConfig: AxiosRequestConfig;

    constructor(baseUrl: string, apiKey: string) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.requestConfig = { headers: { 'api_key': this.apiKey } };
    }

    private reqWithConfig = async (mthd: string, url: string) => {
        const response = await axios({ method: mthd, url: url, ...this.requestConfig });
        return response.data;
    };

    @mockd(DEBUG, 500, mockStationData)
    public getRailStationList() {
        const apiUrl = `${this.baseUrl}/Rail.svc/json/jStations`;
        return this.reqWithConfig('GET', apiUrl);
    };

    @mockd(DEBUG, 500, mockPredictionData)
    public getRailPredictionsForStation(stationCode: string) {
        const apiUrl = `${this.baseUrl}/StationPrediction.svc/json/GetPrediction/${stationCode}`;
        return this.reqWithConfig('GET', apiUrl);
    };

}

export const wmataClient = new WmataClient('https://api.wmata.com', process.env.REACT_APP_WMATA_API_KEY as string);