import ejs from 'ejs';
import ora from 'ora';
import { getYear } from 'date-fns';
import fs from 'fs/promises';
import { lstatSync, existsSync } from 'fs';
import { isNil, unescape } from 'lodash';
import chooseTemplate from './choose-template.js';
import askOverwriteReadme from './ask-overwrite.js';

const README_PATH = 'README.md';

/**
 * Create readme file from the given readmeContent
 *
 * @param {string} readmeContent
 */
const writeReadme = async (readmeContent) => {
  const spinner = ora('Creating README').start();

  try {
    await fs.writeFile(README_PATH, unescape(readmeContent));
    spinner.succeed('README created');
  } catch (err) {
    spinner.fail('README creation fail');
    throw err;
  }
};

/**
 * Get README template content from the given templatePath
 *
 * @param {string} templatePath
 */
const getReadmeTemplate = async (templatePath) => {
  const spinner = ora('Loading README template').start();

  try {
    const template = await fs.readFile(templatePath, 'utf8');
    spinner.succeed('README template loaded');
    return template;
  } catch (err) {
    spinner.fail('README template loading fail');
    throw err;
  }
};

/**
 * Build README content with the given context and templatePath
 *
 * @param {Object} context
 * @param {string} templatePath
 */
const buildReadmeContent = async (context, templatePath) => {
  const currentYear = getYear(new Date());
  const template = await getReadmeTemplate(templatePath);

  return ejs.render(template, {
    filename: templatePath,
    currentYear,
    ...context,
  });
};

/**
 * Validate template path
 *
 * @param {string} templatePath
 */
const validateReadmeTemplatePath = (templatePath) => {
  const spinner = ora('Resolving README template path').start();

  try {
    lstatSync(templatePath).isFile();
  } catch (err) {
    spinner.fail(`The template path '${templatePath}' is not valid.`);
    throw err;
  }

  spinner.succeed('README template path resolved');
};

/**
 * Get readme template path
 * (either a custom template, or a template that user will choose from prompt)
 *
 * @param {String} customTemplate
 */
const getReadmeTemplatePath = async (customTemplate, useDefaultAnswers) => {
  const templatePath = isNil(customTemplate)
    ? await chooseTemplate(useDefaultAnswers)
    : customTemplate;

  validateReadmeTemplatePath(templatePath);

  return templatePath;
};

/**
 * Check if readme generator can overwrite the existed readme
 */
const checkOverwriteReadme = () =>
  !existsSync(README_PATH) || askOverwriteReadme();

export default {
  writeReadme,
  buildReadmeContent,
  README_PATH,
  getReadmeTemplatePath,
  checkOverwriteReadme,
};