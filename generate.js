const fs = require('fs');
const util = require('util');


const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.watchFile);

const generateFileName = function() {
    return `./${(new Date).getTime()}.html`;
}

const easy = async function(username, color) {
    const htmlString = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${username}</title>
</head>
<body>
    <h1>Hello, my name is ${username}. My favorite color is ${color}</h1>
    
</body>
</html>
    `;

    await writeFilePromise(generateFileName(), htmlString);

}

const medium = async function(username, color) {
    const template = await readFilePromise("./template", "utf-8");
    const htmlString = template.replace(new RegExp('\\#\\[username\\]\\#', 'g'), username).replace(new RegExp('\\#\\[color\\]\\#','g'), color);

    
    await writeFilePromise(generateFileName(), htmlString);
}

const hard = async function(username, color) {
    const temp = await readFilePromise("./template.ejs", "utf-8");
    const htmlString = ejs.render(template, {
        username,
        color,
    });

    await writeFilePromise(generateFileName(), htmlString);

}


module.exports = {
    easy,
    medium,
    hard
}