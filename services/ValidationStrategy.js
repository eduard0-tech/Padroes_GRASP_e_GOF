// GOF: Strategy - Define família de algoritmos de validação 
class ValidationStrategy {
    validate(value) {
        throw new Error("Método validate deve ser implementado pelas subclasses");
    }
}

module.exports = ValidationStrategy;