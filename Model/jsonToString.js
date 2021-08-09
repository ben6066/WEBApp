function parseJSON(json) {
    let string = ""

    let parse = Object.values(JSON.parse(json))

    for (let i = 0; i < parse.length; i++) {
        let element = parse[i]
        for (let j = 0; j < element.length; j++) {
            string += element[j];

            if (j !== element.length - 1)
                string += ",";
        }
        string += "\r\n";
    }

    return string
}

module.exports = {parseJSON};