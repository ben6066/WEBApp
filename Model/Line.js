class Line{
    a = 0;
    b = 0;

    constructor(a,b){
        this.a = a;
        this.b = b;
    }

    calcFunc(x){
        return this.a * x + this.b
    }
}
module.exports = Line