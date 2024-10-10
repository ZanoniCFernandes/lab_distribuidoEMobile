class Middleware {

    toCents(valor) {
        return valor*100;
    }

    toReal(valor) {
        return valor/100;
    }

}

module.exports = new Middleware();

