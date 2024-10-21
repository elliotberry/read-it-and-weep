import {cleanSocialNetworkUsername} from '../utils';

export default () => ({
  type: 'input',
  message: '❤️  Patreon username (use empty value to skip)',
  name: 'authorPatreonUsername',
  filter: cleanSocialNetworkUsername
});
