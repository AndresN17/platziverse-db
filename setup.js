'use strict'

const db = require('./');
const debug = require('debug')('platziverse-db');
const inquirer = require('inquirer');
const chalk = require('chalk');

const prompt = inquirer.createPromptModule();

async function setup() {
    const answer = await prompt([{
        type: 'confirm',
        name: 'setup',
        message: 'Esto va a destruir la base de datos, estas seguro?'
    }])

    if (!answer.setup) {
        return console.log('Nothing Happened!');
    }

    const config = {
        database: process.env.DB_NAME || 'platziverse',
        username: process.env.DB_USER || 'andresn17',
        password: process.env.DB_PASSWORD || 'claire5578',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: (s) => debug(s),
        setup: true,
    }
    await db(config).catch(handleFatalError);
    console.log('success');
    process.exit(0);
}

function handleFatalError(err) {
    console.error(`${chalk.red('[Fatal error]')} ${err.message}`);
    console.error(err.stack);
    process.exit(1);
}

setup();