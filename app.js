const UserController = require("./controllers/UserController");
const readline = require('readline');

const controller = new UserController();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showLoggedInMenu(user) {
    console.log(`\n --- BEM-VINDO, ${user.name.toUpperCase()} ---`);
    console.log("1. Ver meus dados");
    console.log("2. Sair");
    rl.question("Escolha uma opção: ", (option) => handleLoggedInMenu(option, user));
}

function handleLoggedInMenu(option, user) {
    switch (option) {
        case '1':
            console.log(`\n📋 Seus dados:`);
            console.log(`Nome: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log(`ID: ${user.id}`);
            showLoggedInMenu(user);
            break;
        case '2':
            console.log("Voltando ao menu principal...");
            showMenu();
            break;
        default:
            console.log("Opção inválida!");
            showLoggedInMenu(user);
            break;
    }
}

function showMenu() {
    console.log("\n--- SISTEMA DE USUÁRIOS ---");
    console.log("1. Cadastrar usuário");
    console.log("2. Fazer login");
    console.log("3. Listar usuários");
    console.log("4. Deletar usuário");
    console.log("5. Editar usuário");
    console.log("6. Sair");
    rl.question("Escolha uma opção: ", handleMenu);
}

function handleMenu(option) {
    switch (option) {
        case '1':
            rl.question("Nome: ", (name) => {
                rl.question("Email: ", (email) => {
                    rl.question("Senha: ", (password) => {
                        controller.createUser(name, email, password);
                        showMenu();
                    });
                });
            });
            break;
        case '2':
            rl.question("Email: ", (email) => {
                rl.question("Senha: ", (password) => {
                    const user = controller.login(email, password);
                    if (user) {
                        showLoggedInMenu(user);
                    } else {
                        showMenu();
                    }
                });
            });
            break;
        case '3':
            controller.getUsers();
            showMenu();
            break;
        case '4':
            rl.question("ID do usuário a deletar: ", (id) => {
                controller.deleteUser(parseInt(id));
                showMenu();
            });
            break;
        case '5':
            rl.question("Deseja editar um usuário? (s/n): ", (resposta) => {
                if (resposta === "n") {
                    console.log("Edição cancelada.");
                    showMenu();
                    return;
                }

                if (resposta === "s") {
                    rl.question("ID do usuário a editar: ", (id) => {
                        rl.question("Novo nome (deixe em branco para manter): ", (name) => {
                            rl.question("Novo email (deixe em branco para manter): ", (email) => {
                                controller.updateUser(parseInt(id), name, email);
                                showMenu();
                            });
                        });
                    });
                } else {
                    console.log("Opção inválida.");
                    showMenu();
                }
            });
            break;
        case '0':
            console.log("Saindo...");
            rl.close();
            break;
        default:
            console.log("Opção inválida!");
            showMenu();
            break;
    }
}

showMenu();