const classes = require('./SimpleAnomalyDetector')
const enclosingCircle = require('smallest-enclosing-circle')
const Point = require('./Point.js')

class HybridAnomalyDetector extends classes.SimpleAnomalyDetector{
    constructor() {
        super();
    }

    learnHelper(ts, p, f1, f2, ps) {
        super.learnHelper(ts, p, f1, f2, ps);

        if(p > 0.5 && p < this.threshold){
            let cl = enclosingCircle(ps);
            let c = new classes.correlatedFeatures(f1, f2, p, 0, cl.r*1.1, cl.x, cl.y);
            this.cf.push(c);
        }
    }

    dist(a, b){
        let x2 = (a.x - b.x) * (a.x - b.x);
        let y2 = (a.y - b.y) * (a.y - b.y);
        return Math.sqrt(x2 + y2);
    }

    isAnomalous(x, y, c){
        return (c.correlation>=this.threshold && super.isAnomalous(x,y,c)) ||
            (c.correlation>0.5 && c.correlation<this.threshold && this.dist(new Point(c.cx,c.cy),new Point(x,y))>c.threshold);
    }
}

module.exports = {HybridAnomalyDetector};