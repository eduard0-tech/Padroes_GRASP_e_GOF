const User = require("../models/User");
const UserService = require("../services/UserService");
const UserFactory = require("../services/UserFactory");
const UserRepository = require("../services/UserRepository");

// GRASP: Controller - CRUD
class UserController {
    constructor() {
        this.userService = new UserService();
        this.userRepository = new UserRepository();
        this.users = this.userRepository.loadUsers();
        this.currentId = this.userRepository.getNextId(this.users);
    }

    // CREATE
    createUser(name, email, password) {
        try {
            this.userService.validateUser(name, email);

            const user = UserFactory.createUser(this.currentId++, name, email, password);
            this.users.push(user);
            this.userRepository.saveUsers(this.users);

            console.log("✅ Usuário criado:", user);
        } catch (error) {
            console.log("❌ Erro:", error.message);
        }
    }

    // READ
    getUsers() {
        console.log("\n📋 Lista de usuários:");
        if (this.users.length === 0) {
            console.log("Nenhum usuário cadastrado.");
            return;
        }
        this.users.forEach(user => {
            console.log(`ID: ${user.id} | Nome: ${user.name} | Email: ${user.email}`);
        });
    }

    // UPDATE
    updateUser(id, name, email) {
        try {
            const user = this.users.find(u => u.id === id);

            if (!user) {
                throw new Error("Usuário não encontrado!");
            }

            if (name) user.name = name;
            if (email) {
                this.userService.validateUser(user.name, email);
                user.email = email;
            }
            this.userRepository.saveUsers(this.users);

            console.log("✏️ Usuário atualizado:", user);
        } catch (error) {
            console.log("❌ Erro:", error.message);
        }
    }

    // DELETE
    deleteUser(id) {
        try {
            const userId = this.users.findIndex(u => u.id === id);

            if (userId === -1) {
                throw new Error("Usuário não encontrado!");
            }

            const deletedUser = this.users[userId];
            this.users.splice(userId, 1);

            this.userRepository.saveUsers(this.users);

            console.log("🗑️ Usuário deletado:", deletedUser);
        } catch (error) {
            console.log("❌ Erro:", error.message);
        }
    }

    // LOGIN
    login(email, password) {
        const user = this.users.find(u => u.email === email);
        if (user && user.password === password) {
            console.log("✅ Login bem-sucedido! Bem-vindo,", user.name);
            return user;
        } else {
            console.log("❌ Email ou senha incorretos!");
            return null;
        }
    }
}

module.exports = UserController;