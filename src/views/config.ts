import * as inquirer from 'inquirer';
import { Configuration } from '../models/configuration';

export class Config {
  private config: Configuration;
  private readonly questions: inquirer.QuestionCollection = [
    {
      type: 'input',
      name: 'companyId',
      message: "What's your company ID?",
    },
    {
      type: 'input',
      name: 'username',
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

  constructor() {
    this.config = new Configuration();
  }

  /**
   * Executes interactive shell and saves user config data
   */
  public doSetup(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const answers = await inquirer.prompt(this.questions);
        this.config.username = answers.username;
        this.config.password = answers.password;
        this.config.companyId = answers.companyId;
        this.config.hourFormat = answers.hourFormat;
        this.config.fingerprint = answers.fingerprint;

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Returns the path to the config file
   */
  public getConfigPath(): string {
    return this.config.path;
  }

  /**
   * Executes interactive shell to set config hour format
   */
  public doConfigHour(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const question: inquirer.QuestionCollection = (this.questions as any)[4];
        const answers = await inquirer.prompt(question);
        this.config.hourFormat = answers.hourFormat;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
