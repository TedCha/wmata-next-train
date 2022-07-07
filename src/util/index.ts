const EARTH_RADIUS_IN_KM = 6371;

const degreeToRadian = (deg: number) => deg * (Math.PI / 180);

/**
 * Wraps `Geolcation.getCurrentPosition()` in a Promise for chaining
 * @param  options 
 * @returns {Promise<GeolocationPosition>} Promise that resolves to GeolocationPosition
 */
export const getPosition = (options?: PositionOptions) => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};

/**
 * Calculates distance between two latitude & longitude points
 * 
 * Uses Haversine Formula - http://www.movable-type.co.uk/scripts/latlong.html
 * @param lat1 
 * @param lon1 
 * @param lat2 
 * @param lon2 
 * @returns {number} Distance between points
 */
export const getDistanceInMeters = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const deltaLat = degreeToRadian(lat1 - lat2);
    const deltaLon = degreeToRadian(lon2 - lon1);
    const a =
        Math.pow(Math.sin(deltaLat / 2), 2) +
        Math.cos(degreeToRadian(lat1)) * Math.cos(degreeToRadian(lat2)) *
        Math.pow(Math.sin(deltaLon / 2), 2)
        ;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (EARTH_RADIUS_IN_KM * c) * 1000; // distance in m
};

/**
 * Overrides a function that returns Promise<any> with mock data
 * @param condition condition to evaluate if mock data should be returned
 * @param timeout timeout to wait to simulate response time
 * @param data the data to be returned with the Promise
 * @returns {any} Promise<any> of passed in data
 */
export function mockd(condition: boolean, timeout: number, data: any): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (typeof descriptor.value !== 'function') return;
        if (condition) {
            descriptor.value = () => {
                return new Promise<any>((resolve) => {
                    setTimeout(() => {
                        resolve(data);
                    }, timeout);
                });
            };
        }
    };
}