import isEmpty from 'lodash/isEmpty';

export default projectInfos => ({
  type: 'input',
  message: '📝  License url (use empty value to skip)',
  name: 'licenseUrl',
  default: projectInfos.licenseUrl,
  when: answersContext => !isEmpty(answersContext.licenseName)
});
