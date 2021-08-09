class TimeSeries{
    dict = {};
    atts = [];
    dataRowSize;

    //CTOR
    constructor(json){
        this.dict = JSON.parse(json);

        this.atts = Object.keys(this.dict)

        this.dataRowSize = this.dict[this.atts[0]].length
    }

    getAttributeData(name){
        return this.dict[name]
    }

    getAttributes(){
        return this.atts
    }
}

module.exports = TimeSeries;


