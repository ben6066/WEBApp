const express = require("express");
const TimeSeries = require('./timeseries');
const simpleAnomalyDetector = require('./SimpleAnomalyDetector.js');
const HybridAnomalyDetector = require('./HybridAnomalyDetector.js');
const csvParser = require("./csvParser");
const app = express();
const parseRequest = require('./parseRequest')

app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile('/index.html')
})

app.route("/detect")
    .post(function(req,res){
        const model_type = req.query.model_type
        const csvFiles = parseRequest.parseRequest(req.body)
        const trainFile = csvFiles[0]
        const testFile = csvFiles[1]
        const trainFileJSON = JSON.stringify(csvParser.parseCsv(trainFile))
        const testFileJSON = JSON.stringify(csvParser.parseCsv(testFile))

        let ts = new TimeSeries(trainFileJSON)
        let ts2 = new TimeSeries(testFileJSON)
        let anomalyDetector = null;
        let flag = 0

        if (model_type === "reg"){
            anomalyDetector = new simpleAnomalyDetector.SimpleAnomalyDetector()

        }
        else if(model_type === "hybrid"){
            anomalyDetector = new HybridAnomalyDetector.HybridAnomalyDetector()
        }
        else{
            res.send("No anomaly detector of that type")
            flag = 1
        }

        if(flag === 0){
            anomalyDetector.learnNormal(ts)
            let x = anomalyDetector.detect(ts2)
            console.log(x);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send(JSON.stringify(x))
        }
    });

app.listen(8080, function() {
    console.log("Server runs on port 8080")
});

