#!/usr/bin/env node
const program = require('commander');
const readline = require('readline');
const { addCustomer, findCustomer, updateCustomer, removeCustomer, listCustomers } = require('./index');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Customer Questions
const questions = [
  {
    type: 'input',
    name: 'firstname',
    message: 'Customer First Name'
  },
  {
    type: 'input',
    name: 'lastname',
    message: 'Customer Last Name'
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Customer Phone Number'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Customer Email Address'
  }
];

program
  .version('1.0.0')
  .alias('v')
  .description('Client Management System');

program
  .command('add')
  .alias('a')
  .description('Add a customer')
  .action(() => {
    const answers = {};

    const askQuestion = (index) => {
      if (index === questions.length) {
        // All questions asked, proceed to addCustomer
        addCustomer(answers);
        rl.close();
        return;
      }

      const question = questions[index];
      rl.question(question.message + ' ', (response) => {
        answers[question.name] = response;
        askQuestion(index + 1);
      });
    };

    askQuestion(0);
  });

program
  .command('find <searchTerm>')
  .alias('f')
  .description('Find a customer by name, email, or phone number')
  .action(searchTerm => {
    findCustomer(searchTerm);
  });

program
  .command('update <_id>')
  .alias('u')
  .description('Update a customer')
  .action(_id => {
    const answers = {};

    const askQuestion = (index) => {
      if (index === questions.length) {
        // All questions asked, proceed to updateCustomer
        updateCustomer(_id, answers);
        rl.close();
        return;
      }

      const question = questions[index];
      rl.question(question.message + ' ', (response) => {
        answers[question.name] = response;
        askQuestion(index + 1);
      });
    };

    askQuestion(0);
  });

program
  .command('remove <_id>')
  .alias('r')
  .description('Remove a customer')
  .action(_id => {
    rl.question('Are you sure you want to remove this customer? (Y/N) ', (response) => {
      if (response.toLowerCase() === 'y') {
        removeCustomer(_id);
      } else {
        console.log('Customer removal cancelled.');
      }
      rl.close();
    });
  });

program
  .command('list')
  .alias('l')
  .description('List all customers')
  .option('-p, --page <page>', 'Specify the page number for pagination', parseInt)
  .option('-s, --size <size>', 'Specify the number of items per page', parseInt)
  .action((options) => {
    listCustomers(options.page, options.size);
    rl.close();
  });

program.parse(process.argv);
