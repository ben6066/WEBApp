const Line = require('./Line.js')

function avg(x){
    let sum = 0
    for(let i = 0; i < x.length; i++)
        sum += x[i];
    return sum / x.length
}

function variance(x){
    let average = avg(x)
    let sum = 0
    for(let i = 0; i < x.length; i++)
        sum += x[i] * x[i]
    return (sum / x.length) - (average * average)
}

function cov(x, y){
    let sum = 0
    for(let i = 0; i < x.length; i++)
        sum += x[i] * y[i]
    sum /= x.length;
    return sum - avg(x) * avg(y)
}

function pearson(x, y){
    let sqrtMultiplication = Math.sqrt(variance(x)) * Math.sqrt(variance(y))
    return cov(x,y) / sqrtMultiplication
}

function linear_reg(points){
    let x = [];
    let y = [];
    for(let i = 0; i < points.length; i++){
        x[i]=points[i].x
        y[i]=points[i].y
    }

    let a = cov(x,y) / variance(x)
    let b = avg(y) - a * avg(x)

    return new Line(a, b)
}

module.exports = {pearson, linear_reg};
