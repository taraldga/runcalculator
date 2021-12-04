
export type Metric = "km" | "miles"

export const getDistanceInMeters = (distance: number, convertFrom: Metric) => {
    switch(convertFrom) {
        case "km":
            return distance * 1000;
        case "miles":
            return distance * 1609; // Actually 1609.34 but use this for simplicity now
    }
}

export const calculateTimePerDistance = (secondsPerKm: number, distance: number) => {

}