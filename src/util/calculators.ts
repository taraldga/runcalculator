
export type Metric = "km" | "miles" | "meters"

export const convertToSeconds = (input: string) => {
    const values = input.split(":")
    const hours = Number.parseInt(values[0]);
    const minutes = Number.parseInt(values[1]);  
    const seconds = Number.parseInt(values[2]);
    
    const totalSeconds = (hours * 60 * 60) +  (minutes * 60) + seconds
    return totalSeconds;
}

export const convertToFormattedTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / (60*60));
    const minutes = Math.floor((timeInSeconds - (hours * 60 * 60)) / 60);  
    const seconds = Math.floor(timeInSeconds - (hours * 60 * 60) - (minutes * 60) );

    return `${hours > 0 ? hours.toString().padStart(2,"0") + ":": ""}${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`
}


export const getDistanceInMeters = (distance: number, convertFrom: Metric) => {
    switch(convertFrom) {
        case "km":
            return distance * 1000;
        case "miles":
            return distance * 1609; // Actually 1609.34 but use this for simplicity now
        case "meters":
            return distance;
        default:
            return distance;
    }
}

export const calculateTimePerDistance = (secondsPerKm: number, distance: number) => {
    return secondsPerKm * distance;
}
