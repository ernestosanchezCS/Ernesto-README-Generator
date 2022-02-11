const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");

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
        default: "README",
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

init();
