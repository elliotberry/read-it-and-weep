import {cleanSocialNetworkUsername} from '../utils';

export default projectInfos => ({
  type: 'input',
  message: '👤  GitHub username (use empty value to skip)',
  name: 'authorGithubUsername',
  default: projectInfos.githubUsername,
  filter: cleanSocialNetworkUsername
});
