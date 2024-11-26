import inquirer from 'inquirer';
import {flatMap} from 'lodash';
import questionsBuilders from './questions.js';
import utils from './utils.js';

/**
 * Ask user questions and return context to generate a README
 *
 * @param {Object} projectInfos
 * @param {Boolean} useDefaultAnswers
 */
export default async (projectInfos, useDefaultAnswers) => {
  const questions = flatMap(Object.values(questionsBuilders), questionBuilder =>
    questionBuilder(projectInfos)
  )

  const answersContext = useDefaultAnswers
    ? await utils.getDefaultAnswers(questions)
    : await inquirer.prompt(questions)

  return {
    isGithubRepos: projectInfos.isGithubRepos,
    repositoryUrl: projectInfos.repositoryUrl,
    projectPrerequisites: undefined,
    isProjectOnNpm: utils.isProjectAvailableOnNpm(answersContext.projectName),
    ...answersContext
  }
};
