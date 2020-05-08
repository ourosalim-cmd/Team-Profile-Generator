const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

const outputPath = path.resolve(__dirname, "output", "team.html");

const teamMembers = [];
const idArray = [];

function appMenu() {

  function managerInfo() {
    console.log("build team");
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "Manager's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Cannot be empty";
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "Manager's id?",
         validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Cannot be zero or less";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Manager's email?",
        validate: answer => {
          //validEmail();
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Inalid email address. Folloe this format: example@gmail.com";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Manager's office number?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Cannot be zero or less";
        }
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add",
        choices: [
          "Engineer",
          "Intern",
          "No, I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      case "No, I don't want to add any more team members":
        buildTeam();
        default:
          break;
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "Engineer's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Connot be empty.";
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "Engineer's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Please enter a different number.";
            } else {
              return true;
            }
                        
          }
          return "Cannot be zero or less";
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Engineer's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Inalid email address. Folloe this format: example@gmail.com";
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "Engineer's GitHub username?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Connot be empty.";
        }
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "Intern's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Connot be empty.";
        }
      },
      {
        type: "input",
        name: "internId",
        message: "Intern's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Please enter a different number.";
            } else {
              return true;
            }
                        
          }
          return "Cannot be zero or less.";
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "Intern's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Inalid email address. Folloe this format: example@gmail.com";
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "Intern's school?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Connot be empty.";
        }
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }
  function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  managerInfo();

}


appMenu();

