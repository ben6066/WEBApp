const classes = require('./AnomalyDetector.js')
const Point = require('./Point.js')
const functions = require('./anomaly_detection_util.js')
const fixedReport = require('./fixedReport')

class correlatedFeatures {
    constructor(feature1, feature2, correlation, lin_reg, threshold, cx, cy) {
        this.feature1 = feature1;
        this.feature2 = feature2;
        this.correlation = correlation;
        this.lin_reg = lin_reg;
        this.threshold = threshold;
        this.cx = cx;
        this.cy = cy;
    }
}

class SimpleAnomalyDetector extends classes.TimeSeriesAnomalyDetector{
    threshold = 0.9;
    cf = [];

    constructor() {
        super();
    }

    toPoints(x, y) {
        let ps = [];
        for (let i = 0; i < x.length; i++) {
            ps[i] = new Point(x[i], y[i]);
        }

        return ps;
    }

    findThreshold(ps, rl) {
        let max = 0
        for (let i = 0; i < ps.length; i++) {
            let d = Math.abs(ps[i].y - rl.calcFunc(ps[i].x))
            if (d > max)
                max = d;
        }

        return max;
    }

    learnHelper(ts, p, f1, f2, ps) {
        if (p > this.threshold) {
            let lin_reg = new functions.linear_reg(ps);
            let c = new correlatedFeatures(f1, f2, p, lin_reg, this.findThreshold(ps, lin_reg) * 1.1, 0, 0);
            this.cf.push(c);
        }
    }

    learnNormal(ts) {
        super.learnNormal(ts);
        let atts = ts.getAttributes();
        let vals = [];

        for (let i = 0; i < atts.length; i++) {
            let x = ts.getAttributeData(atts[i]);
            vals.push(x)
        }

        for (let i = 0; i < atts.length; i++) {
            let f1 = atts[i];
            let max = 0;
            let jmax = 0;
            for (let j = i + 1; j < atts.length; j++) {
                let p = Math.abs(functions.pearson(vals[i], vals[j]));
                if (p > max) {
                    max = p;
                    jmax = j;
                }
            }
            let f2 = atts[jmax];
            let ps = this.toPoints(ts.getAttributeData(f1), ts.getAttributeData(f2));
            this.learnHelper(ts, max, f1, f2, ps);
        }
    }

    isAnomalous(x, y, c) {
        return (Math.abs(y - c.lin_reg.calcFunc(x)) > c.threshold);
    }

    detect(ts) {
        let v = [];
        for (let i = 0; i < this.cf.length; i++) {
            let c = this.cf[i];
            let x = ts.getAttributeData(c.feature1);
            let y = ts.getAttributeData(c.feature2);
            for (let j = 0; j < x.length; j++) {
                if (this.isAnomalous(x[j], y[j], c)) {
                    let d = c.feature1 + "~" + c.feature2;
                    v.push(new classes.AnomalyReport(d, (j + 1)));
                }
            }
        }
        let fr = new fixedReport()
        return fr.fixReports(v)
    }
}

module.exports = {SimpleAnomalyDetector, correlatedFeatures};