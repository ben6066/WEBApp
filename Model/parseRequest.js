function parseRequest (request){
    let csvFilesContent = ["", ""]

    let requestAsString = Object.values(request)

    let content = (requestAsString[0]).split("\r\n");

    let i = 3;

    while(content[i] !== ""){
        csvFilesContent[1] += content[i];
        csvFilesContent[1] += "\r\n";
        i++;
    }

    i += 5;

    while(content[i] !== ""){
        csvFilesContent[0] += content[i];
        csvFilesContent[0] += "\r\n";
        i++;
    }

    return csvFilesContent;
}

module.exports = {parseRequest};