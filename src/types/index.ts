
export interface PredictionData {
    Car?: string,
    Destination: string,
    DestinationCode?: string,
    DestinationName: string,
    Group: string,
    Line: string,
    LocationCode: string,
    LocationName: string,
    Min: string
}

export interface StationData {
    Code: string,
    Name: string,
    StationTogether1: string,
    StationTogether2?: string,
    LineCode1: string,
    LineCode2?: string,
    LineCode3?: string,
    LineCode4?: string,
    Lat: number,
    Lon: number,
    Address: {
        Street: string,
        City: string,
        State: string,
        Zip: string
    }
}