const ValidationStrategy = require("./ValidationStrategy");

// GOF: Strategy - Implementação concreta para validação de email
class EmailValidationStrategy extends ValidationStrategy {
    validate(email) {
        if (!email || !email.includes("@")) {
            throw new Error("Email inválido!");
        }
    }
}

module.exports = EmailValidationStrategy;