export default projectInfos => ({
  type: 'input',
  message: '📄  Project description',
  name: 'projectDescription',
  default: projectInfos.description
});
