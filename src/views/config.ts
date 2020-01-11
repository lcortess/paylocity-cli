import * as inquirer from 'inquirer';

export class Config {
  private readonly questions: inquirer.QuestionCollection = [
    {
      type: 'input',
      name: 'companyId',
      message: "What's your company ID?",
    },
    {
      type: 'input',
      name: 'user',
      message: "What's your username?",
    },
    {
      type: 'password',
      name: 'password',
      message: "What's your password?",
    },
    {
      type: 'input',
      name: 'fingerprint',
      message: "What's your fingerprint?",
    },
    {
      type: 'list',
      name: 'hourFormat',
      choices: [
        { name: '15:42', value: 'HH:mm' },
        { name: '03:42 PM', value: 'LT' },
      ],
      message: 'Which hour format do you prefer?',
    },
  ];

  constructor() {}

  /**
   * Excecutes interactive shell and saves user config data
   */
  public doSetup(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const answers = await inquirer.prompt(this.questions);
        console.log(JSON.stringify(answers, null, 4));

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
