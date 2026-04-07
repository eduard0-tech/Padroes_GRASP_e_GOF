const User = require("../models/User");

// GOF: Factory - criação dos usuarios
class UserFactory {
    static createUser(id, name, email, password) {
        return new User(id, name, email, password);
    }
}

module.exports = UserFactory;