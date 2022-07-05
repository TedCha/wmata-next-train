import axios, { AxiosRequestConfig } from "axios";
import mockStationData from '../data/mockStationData.wmata.json';
import mockPredictionData from '../data/mockStationData.wmata.json';

const DEBUG = process.env.REACT_APP_IS_DEV === 'true';
const BASE_URL = 'https://api.wmata.com';
const WMATA_API_CONFIG: AxiosRequestConfig = {
    headers: { 'api_key': process.env.REACT_APP_WMATA_API_KEY as string }
};

const reqWithConfig = async (mthd: string, url: string) => {
    const response = await axios({ method: mthd, url: url, ...WMATA_API_CONFIG });
    return response.data;
};

const getRailStationList = () => {
    if (DEBUG) {
        return new Promise<any>((resolve) => {
            setTimeout(() => {
                resolve(mockStationData);
            }, 500);
        });
    }

    const apiUrl = `${BASE_URL}/Rail.svc/json/jStations`;
    return reqWithConfig('GET', apiUrl);
};

const getRailPredictionsForStation = (stationCode: string) => {
    if (DEBUG) {
        return new Promise<any>((resolve) => {
            setTimeout(() => {
                resolve(mockPredictionData);
            }, 500);
        });
    }

    const apiUrl = `${BASE_URL}/StationPrediction.svc/json/GetPrediction/${stationCode}`;
    return reqWithConfig('GET', apiUrl);
};

const wmataService = { getRailStationList, getRailPredictionsForStation };

export default wmataService;