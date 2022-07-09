import axios, { AxiosRequestConfig } from "axios";

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

    public getRailStationList() {
        const apiUrl = `${this.baseUrl}/Rail.svc/json/jStations`;
        return this.reqWithConfig('GET', apiUrl);
    };

    public getRailPredictionsForStation(stationCode: string) {
        const apiUrl = `${this.baseUrl}/StationPrediction.svc/json/GetPrediction/${stationCode}`;
        return this.reqWithConfig('GET', apiUrl);
    };

}

const baseUrl = process.env.REACT_APP_IS_DEV === 'true' 
    ? process.env.REACT_APP_WMATA_DEV_BASE_URL 
    : process.env.REACT_APP_WMATA_PROD_BASE_URL; 

export const wmataClient = new WmataClient(baseUrl as string, process.env.REACT_APP_WMATA_API_KEY as string);