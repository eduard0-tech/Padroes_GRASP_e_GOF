const fs = require('fs');
const path = require('path');

const user_file = path.join(__dirname, '..', 'users.txt');

class UserRepository {
    constructor() {
        if (!fs.existsSync(user_file)) {
            fs.writeFileSync(user_file, JSON.stringify([/* tranforma em string */]), 'utf8');
        }
    }

    loadUsers() {
        try {
            const data = fs.readFileSync(user_file, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error.message);
            return [];
        }
    }

    saveUsers(users) {
        try {
            fs.writeFileSync(user_file, JSON.stringify(users, null, 2), 'utf8');
        } catch (error) {
            console.error('Erro ao salvar usuários:', error.message);
        }
    }

    getNextId(users) {
        if (users.length === 0) return 1;
        const maxId = Math.max(...users.map(user => user.id));
        return maxId + 1;
    }
}

module.exports = UserRepository;