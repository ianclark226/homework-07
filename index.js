const inquirer = require('inquirer');

const { easy } = require('./generate')

function getUserInput() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is your github username?',
            name: 'username',
        
        },
        {
            type: 'list',
            message: 'What is your favorite color?',
            name: 'color',
            choices: [
                {
                    name: 'Red',
                    value: 'red'
                },
                {
                    name: 'Blue',
                    value: 'blue'
                },
            ]
        }
    ])
}

async function main() {
    const {username, color} = await getUserInput();
    easy(username, color);
}

main();