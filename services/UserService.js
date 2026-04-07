// GRASP: Pure Fabrication - Classe criada para organizar a lógica 
class UserService {
    constructor() {
        // GOF: Singleton - Garante apenas uma instância da classe
        if (UserService.instance) {
            return UserService.instance;
        }
        UserService.instance = this;
        // GRASP: Indirection - Usa estratégias para validação, evitando acoplamento 
        this.nameStrategy = new (require("./NameValidationStrategy"))();
        this.emailStrategy = new (require("./EmailValidationStrategy"))();
    }

    // GRASP: Information Expert - Possui conhecimento necessário para validar usuários
    // GOF: Strategy - Usa estratégias intercambiáveis para validação
    validateUser(name, email) {
        this.nameStrategy.validate(name);
        this.emailStrategy.validate(email);
    }
}

module.exports = UserService;