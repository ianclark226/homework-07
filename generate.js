const fs = require('fs');
const util = require('util');
const ejs = require('ejs');
const puppeteer = require('puppeteer');


const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const generateFileName = function(fileExtension = 'html') {
    return `./_${(new Date).getTime()}.${fileExtension}`;
}

const colors = {
    yellow: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "yellow",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "blue",
      photoBorderColor: "#73448C"
    },
    purple: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "purple",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "red",
      photoBorderColor: "white"
    }
  };
  

const first = async function(username, color) {
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
    

    <style>
    @page {
      margin: 0;
    }
   *,
   *::after,
   *::before {
   box-sizing: border-box;
   }
   html, body {
   padding: 0;
   margin: 0;
   }
   html, body, .wrapper {
   height: 100%;
   }
   .wrapper {
   background-color: ${colors[data.color].wrapperBackground};
   padding-top: 100px;
   }
   body {
   background-color: white;
   -webkit-print-color-adjust: exact !important;
   font-family: 'Cabin', sans-serif;
   }
   main {
   background-color: #E9EDEE;
   height: auto;
   padding-top: 30px;
   }
   h1, h2, h3, h4, h5, h6 {
   font-family: 'BioRhyme', serif;
   margin: 0;
   }
   h1 {
   font-size: 3em;
   }
   h2 {
   font-size: 2.5em;
   }
   h3 {
   font-size: 2em;
   }
   h4 {
   font-size: 1.5em;
   }
   h5 {
   font-size: 1.3em;
   }
   h6 {
   font-size: 1.2em;
   }
   .photo-header {
   position: relative;
   margin: 0 auto;
   margin-bottom: -50px;
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
   background-color: ${colors[data.color].headerBackground};
   color: ${colors[data.color].headerColor};
   padding: 10px;
   width: 95%;
   border-radius: 6px;
   }
   .photo-header img {
   width: 250px;
   height: 250px;
   border-radius: 50%;
   object-fit: cover;
   margin-top: -75px;
   border: 6px solid ${colors[data.color].photoBorderColor};
   box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
   }
   .photo-header h1, .photo-header h2 {
   width: 100%;
   text-align: center;
   }
   .photo-header h1 {
   margin-top: 10px;
   }
   .links-nav {
   width: 100%;
   text-align: center;
   padding: 20px 0;
   font-size: 1.1em;
   }
   .nav-link {
   display: inline-block;
   margin: 5px 10px;
   }
   .workExp-date {
   font-style: italic;
   font-size: .7em;
   text-align: right;
   margin-top: 10px;
   }
   .container {
   padding: 50px;
   padding-left: 100px;
   padding-right: 100px;
   }

   .row {
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between;
     margin-top: 20px;
     margin-bottom: 20px;
   }

   .card {
     padding: 20px;
     border-radius: 6px;
     background-color: ${colors[data.color].headerBackground};
     color: ${colors[data.color].headerColor};
     margin: 20px;
   }
   
   .col {
   flex: 1;
   text-align: center;
   }

   a, a:hover {
   text-decoration: none;
   color: inherit;
   font-weight: bold;
   }

   @media print { 
    body { 
      zoom: .75; 
    } 
   }
</style>

</body>
</html>
    `;

    await writeFilePromise(generateFileName(), htmlString);

}



const second = async function(username, color) {
    const template = await readFilePromise("./template.html", "utf-8");
    const htmlString = template.replace(new RegExp('\\#\\[username\\]\\#', 'g'), username).replace(new RegExp('\\#\\[color\\]\\#', 'g'), color);

    
    await writeFilePromise(generateFileName(), htmlString);
}



const third = async function(username, data) {
    const template = await readFilePromise("./template.ejs", "utf-8");
    const htmlString = ejs.render(template, {
        username,
        data
        
    });

    

    await writeFilePromise(generateFileName(), htmlString);
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setContent(htmlString);
    await page.pdf({path: generateFileName('pdf'), format: 'A4'});

    
    await browser.close();
    console.log("")

    
}


module.exports = {
    first,
    second,
    third
}

