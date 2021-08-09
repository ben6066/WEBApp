class fixedReport{
    start = 0
    end = 0

    constructor(start, end, description) {
        this.start = start;
        this.end = end;
        this.description = description;
    }

    fixReports(reportsArray){
        let fixedReportsArray = [];

        if(reportsArray.length === 0)
            return fixedReportsArray;

        let first = 0
        let end = 0
        let ar1 = 0
        let ar2 = 0

        for(let i = 0; i < reportsArray.length - 1; i++){
            ar1 = reportsArray[i]
            ar2 = reportsArray[i + 1]
            first = ar1.timeStep
            for(let j = i + 1; j < reportsArray.length; j++){
                if((ar1.description.trim() === ar2.description.trim()) && ((ar2.timeStep - ar1.timeStep) === 1)){
                    if(j + 1 < reportsArray.length){
                        ar1 = ar2;
                        ar2 = reportsArray[j + 1]
                    }

                    else{
                        end = ar2.timeStep;
                        fixedReportsArray.push(new fixedReport(first, end, ar1.description))
                        if(ar2.description.trim() === reportsArray[reportsArray.length - 1].description.trim() && ar2.timeStep === reportsArray[reportsArray.length - 1].timeStep){
                            i = reportsArray.length;
                        }
                        break;
                    }
                }
                else{
                    end = ar1.timeStep;
                    fixedReportsArray.push(new fixedReport(first, end, ar1.description))
                    j = reportsArray.length;
                    i += (end - first);
                }
            }
        }

        if(fixedReportsArray.length === 0)
            return fixedReportsArray;

        let oldSize = fixedReportsArray.length;

        for(let i = 0; i < oldSize; i++){
            let currentAnomaly = fixedReportsArray[i]
            let reversedDescription = "";

            let names = (currentAnomaly.description).split("~");
            reversedDescription += names[1];
            reversedDescription += "~";
            reversedDescription += names[0];

            fixedReportsArray.push(new fixedReport(currentAnomaly.start, currentAnomaly.end, reversedDescription))
        }

        return fixedReportsArray
    }
}

module.exports = fixedReport;