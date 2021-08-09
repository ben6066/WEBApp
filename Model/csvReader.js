const fs = require('fs');

function readCsv(filePath){
    const data = fs.readFileSync(filePath)
        .toString() // convert Buffer to string

    return data
}

module.exports = {readCsv};