const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { Octokit } = require('@octokit/rest');
const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer');
const { exec, execSync, spawnSync, spawn } = require('child_process')
const octokit = new Octokit()
//question function
const askQuestion = (question) => {
    return inquirer.prompt(question)
}


//file existance chk function
const chkFileExistance = (basePath, filename) => {
    if (fs.existsSync(path.join(basePath, filename))) {
        return false
    } else {
        return true
    }
}

const main = async () => {
    //Clear the console
    clear()


    //banner display
    console.log(
        chalk.yellowBright(
            figlet.textSync('Cyber init', { horizontalLayout: 'full' })
        )
    );


    //get args
    const args = process.argv.slice(2);


    //get current base_path
    const current_base_path = process.cwd()

    //initialize file path
    var project_name = ''

    //chk for file existance else ask for name
    if (args.length > 0) {
        if (chkFileExistance(current_base_path, args[0])) {
            project_name = args[0]
        } else {
            console.log(chalk.bgRedBright(chalk.whiteBright(`Directory with name ${args[0]} already exists.!!!`)))
            return
        }
    } else {
        const question_repo_name = {
            type: 'input',
            name: 'name',
            message: 'Enter a name for the Project:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter a name for the repository.';
                }
            }
        }
        while (project_name == '') {
            let name = await askQuestion(question_repo_name)
            if (chkFileExistance(current_base_path, name.name)) {
                project_name = name.name
            } else {
                console.log(chalk.redBright(`Directory with name ${name.name} already exists.!!!`))
                console.log(chalk.yellowBright(`Enter a new name.`))

            }
        }

    }
    //Name asking Finish
    console.log(chalk.greenBright("Project Name: ", project_name))
    //Get Github repos
    var repos = []
    try {
        repos = await octokit.repos.listBranches({
            owner: 'cybermritunjay',
            repo: 'starter-cli',
            headers: 'Accept: application/vnd.github.v3+json'
        })
    } catch (error) {
        console.log(chalk.bgRedBright(chalk.whiteBright("Opps....Looks like your internet is not working")))
        return
    }
    const repository_list = []

    //clean repos data
    repos.data.forEach(e => {
        let x = 'fdf'
        if (e.name.search('/') > 0) {
            let lst = e.name.split('/')
            repository_list.push({
                "name": lst[lst.length - 1],
                "url": e.commit.url
            })
        }
    });

    //question for selecting repo
    const repo_select_question = {
        type: 'list',
        name: 'repo_name',
        message: 'Select Your Project Type:',
        choices: repository_list.map((e) => e.name)
    }
    var project_type = null

    try {
        project_type = await askQuestion(repo_select_question)
    } catch (error) {
        console.log(chalk.bgRedBright(chalk.whiteBright(error)))
        return
    }
    console.log(chalk.greenBright("Project type: " + project_type.repo_name))
    var confirmation = null
    try {
        const confirmation_question = {
            type: 'confirm',
            name: 'answer',
            message: "Selected Project type" + project_type.repo_name,
            default: true
        }
        confirmation = await askQuestion(confirmation_question)
    } catch (error) {
        console.log(chalk.bgRedBright(chalk.whiteBright(error)))
        return
    }
    if (!confirmation.answer) {
        console.log(chalk.redBright("Looks like u made a mistake here, try later"))
        return;
    }
    try {

        console.log(chalk.yellow("Downloading Project Files"))
        var child = exec(`git clone -b ${project_type.repo_name} --single-branch https://github.com/cybermritunjay/starter-cli.git ${project_name}`)
        child.stdout.setEncoding('utf8');
        child.stdout.on('data', function (data) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(data)
        });

        child.stderr.setEncoding('utf8');
        child.stderr.on('data', function (data) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(data)
        });
    } catch (error) {
        console.log(chalk.bgRedBright(chalk.whiteBright(error)))
        return
    }
    child.on('close', async () => {
        console.log(chalk.greenBright("Repository copied Sucessfully"))
        console.log(chalk.yellow("Installing Packages"))
        try {
            await process.chdir(path.join(current_base_path, project_name))
        } catch (error) {
            console.log(chalk.bgRedBright(chalk.whiteBright(error)))
            return
        }
        var install_modules = exec(`yarn`)
        child.stdout.setEncoding('utf8');
        child.stdout.on('data', function (data) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(data)
        });

        child.stderr.setEncoding('utf8');
        child.stderr.on('data', function (data) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(data)
        });
        install_modules.on('close', () => {
            console.log(chalk.greenBright("Project Created Happy Coding.!!!"))
        })

    })


}
main()

// const confirmation_question = {
//     type: 'confirm',
//     name: 'answer',
//     message: "Selected Project type",
//     default: true
// }
// const confirmation = askQuestion(confirmation).then(res => console.log(res))