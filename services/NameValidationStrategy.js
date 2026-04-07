const ValidationStrategy = require("./ValidationStrategy");

// GOF: Strategy - Implementação concreta para validação de nome
class NameValidationStrategy extends ValidationStrategy {
    validate(name) {
        if (!name || name.trim() === "") {
            throw new Error("Nome é obrigatório!");
        }
    }
}

module.exports = NameValidationStrategy;