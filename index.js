const inquirer = require('inquirer');
const axios = require('axios');

const { generateHTML, second, third } = require('./generate')

function getUserInput() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is your github username?',
            default: 'ianclark226',
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
                {
                    name: 'Purple',
                    value: 'purple'
                },
                {
                    name: 'Yellow',
                    value: 'yellow'
                },
            ]
        }
    ])
}

async function getGithubInfor(username){
    const { data }= await axios.get(`https://api.github.com/users/${username}`);
    return data;
}

async function main() {
    const {username} = await getUserInput();
  
   const data = await getGithubInfor(username); 
   third(username, data);
   
}

main();
