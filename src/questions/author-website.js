import {getAuthorWebsiteFromGithubAPI} from '../utils';

export default projectInfos => ({
  type: 'input',
  message: '🏠  Author website (use empty value to skip)',
  name: 'authorWebsite',
  default: async answers =>
    answers.authorGithubUsername !== projectInfos.githubUsername
      ? getAuthorWebsiteFromGithubAPI(answers.authorGithubUsername)
      : projectInfos.authorWebsite
});
