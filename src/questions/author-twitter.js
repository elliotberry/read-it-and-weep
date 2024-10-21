import {cleanSocialNetworkUsername} from '../utils';

export default () => ({
  type: 'input',
  message: '🐦  Twitter username (use empty value to skip)',
  name: 'authorTwitterUsername',
  filter: cleanSocialNetworkUsername
});
