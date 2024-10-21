import isNil from 'lodash/isNil';

export default projectInfos => ({
  type: 'input',
  message: '📦  Install command (use empty value to skip)',
  name: 'installCommand',
  default: answers => {
    const packageManager = answers.packageManager || projectInfos.packageManager
    return isNil(packageManager) ? undefined : `${packageManager} install`
  }
});
