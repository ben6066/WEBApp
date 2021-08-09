function parseCsv (csv){
    let csvData  = {};

    let rows = csv.split("\r\n")

    let names = rows[0].split(",")

    rows.splice(0,1)
    rows.splice(rows.length-1,1)

    for(let i=0; i< names.length;i++){
        csvData[names[i]] = []

        for(let j=0; j< rows.length; j++){

            let x = rows[j].split(",")
            const xAsFloat = x.map((i) => Number(i));
            csvData[names[i]].push(xAsFloat[i])
        }
    }

    return csvData;
}

module.exports = {parseCsv};