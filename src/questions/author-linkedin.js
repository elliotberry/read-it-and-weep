import {cleanSocialNetworkUsername} from '../utils';

export default () => ({
  type: 'input',
  message: '💼  LinkedIn username (use empty value to skip)',
  name: 'authorLinkedInUsername',
  filter: cleanSocialNetworkUsername
});
