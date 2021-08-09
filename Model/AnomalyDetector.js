class AnomalyReport {
    constructor(description, timeStep) {
        this.description = description;
        this.timeStep = timeStep;
    }
}

// Abstract class
class TimeSeriesAnomalyDetector {
    constructor() {

    }

    learnNormal(ts) {

    }

    detect(ts) {

    }
}

module.exports = {TimeSeriesAnomalyDetector, AnomalyReport};

