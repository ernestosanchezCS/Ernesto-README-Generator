const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const validateEmail = (email) => {
    var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const input = [
    {
        type: "input",
        name: "GitHub",
        message: "Please type your GitHub username",
        default: "ernestosanchezCS",
    },
    {
        type: "input",
        name: "fileName",
        message: "Please provide the name for a .md file",
        default: "readme",
    },
    {
        type: "input",
        name: "email",
        message: "Please type your email",
        default: "ernestosanchez8888@gmail.com",
        validate: validateEmail,
    },
    {
        type: "input",
        name: "URL",
        message: "Please type the URL to your project",
        default: "GOODREADME",
    },
    {
        type: "input",
        name: "title",
        message: "Please type your project's name",
        default: "GoodREADME.md generator",
    },
    {
        type: "input",
        name: "description",
        message: "Please write a short description of your project",
        default:
            "*Good README.md Generator* CLI (Command-Line Interface) apps that dynamically generates a professional README.md from a user's input using the Axios, Inquirer and HTML-PDF package.",
    },
    {
        type: "input",
        name: "userstory",
        message: "Please tell a user story",
        default:
            "AS A developer,I WANT a README generator, SO THAT can quickly create a professional README for a new project",
    },
    {
        type: "input",
        name: "demovideo",
        message: "Link to video",
        default: "![Demo Good ReadMe Generator](https://.gif)",
    },
    {
        type: "input",
        name: "firstscreenshot",
        message: "Link to screenshot image",
        default: "https://.png",
    },
    {
        type: "input",
        name: "secondscreenshot",
        message: "Link to another screenshot image",
        default: "https://.png",
    },
    {
        type: "list",
        name: "license",
        message: "Please choose a licence below",
        choices: ["MIT", "ISC", "Apache", "IPL", "Unlicense"],
    },
    {
        type: "list",
        name: "color",
        message: "Please choose your favourite colour",
        choices: ["blue", "green", "magenta", "yellow", "grey"],
    },
    {
        type: "input",
        name: "iinstallation",
        message: "What command should be run to install dependencies?",
        default: "npm i",
    },
    {
        type: "input",
        name: "htmlpdfinstallation",
        message: "What other command should be run to install dependencies?",
        default: "npm install html-pdf",
    },
    {
        type: "input",
        name: "test",
        message: "What command should be run to run tests?",
        default: "There is no testing required",
    },
    {
        type: "input",
        name: "usage",
        message: "What command should be run to run tests?",
        default: "node index.js",
    },
    {
        type: "input",
        name: "contributing",
        message:
            "What does the user need to know about contributing to the repository?",
        default:
            "It is an open project and everyone can contribute - please send and email requesting to be added as a contributor",
    },
];

function writeReadMeFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            throw err;
        }
    });
}

async function init() {
    inquirer.prompt(input).then(function (data) {
        console.log(data);

        let url =
            "https://api.github.com/users/" + data.Username + "/events/public";

        axios.get(url).then(function (response) {
            let email = data.email;
            data["email"] = email;

            writeReadMeFile(data.fileName + ".md", generateReadMeFile(data));
        });
    });
}

init();

function getBadge(licence, color) {
    if (licence !== "None") {
        return `[![Licence : ${licence}](https://img.shields.io/badge/Licence-${licence}-${color}.svg)](https://opensource.org/licences/${licence})`;
    } else if (licence === "Apache") {
        return `[![Licence : ${licence}](https://img.shields.io/badge/Licence-${licence}-%202.0-${color}.svg)](https://opensource.org/licences/${licence}-2.0)`;
    } else if (licence === "IPL") {
        return `[![Licence : ${licence}](https://img.shields.io/badge/Licence-${licence}-${color}.svg)](https://opensource.org/licences/${licence}-1.0)`;
    } else if (licence === "Unlicence") {
        return `[![License: Unlicense](https://img.shields.io/badge/license-${licence}-${color}.svg)](http://unlicense.org/)`;
    } else {
        return ``;
    }
}

function getLicense(license) {
    if (license !== "None") {
        return `
## License
    License is ${license} standard license.`;
    } else {
        return ``;
    }
}

function generateReadMeFile(data) {
    return `
# ${data.title}
${getBadge(data.license, data.color)}
    
## Description
    
${data.description}
    
## Table of Contents 
* [User Story](#userstory)
* [Demo Video](#demovideo)
* [Screen Shots](#screenshots)
    
* [Installation](#installation)
    
* [Usage](#usage)
    
* [License](#license)
    
* [Contributing](#contributing)
    
* [Tests](#tests)
    
* [Questions](#questions)
## User Story
    
${data.userstory}
## Demo Video
    
${data.demovideo}
## Screenshots
![Screen Shot](${data.firstscreenshot})
![Screen Shot](${data.secondscreenshot})
    
   
## Installation
    
This project uses 2 npm packages: 
* [axios](https://www.npmjs.com/package/axios)
* [inquirer](https://www.npmjs.com/package/inquirer)
To install necessary dependencies, run the following command:
    
\`\`\`
${data.iinstallation}
\`\`\`
\`\`\`
${data.htmlpdfinstallation}
\`\`\`
    
## Usage
    
To run tests, run the following command:
    
\`\`\`
${data.usage}
\`\`\`
    
${getLicense(data.license)}
        
## Contributing
    
${data.contributing}
    
## Tests
    
${data.test}
    
## Questions
    
If you have any questions about the repo, open an issue or contact [${
        data.GitHub
    }](https://github.com/${data.GitHub}/) directly at ${data.email}.`;
}
